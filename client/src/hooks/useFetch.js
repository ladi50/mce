import { useCallback, useEffect, useMemo, useState } from "react";

const useFetch = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const controller = useMemo(() => new AbortController(), []);
    const { signal } = controller;

    const fetchHandler = useCallback(async (url, args) => {
        try {
            setLoading(true);
            setErrors(null);

            const response = await fetch(url, { ...args, signal });

            if (!response.ok) {
                new Error();
            }

            setLoading(false);

            return await response.json();
        } catch (err) {
            setLoading(false);
            setErrors(err.message.split(","));
        }
    }, [signal]);

    useEffect(() => {
        return () => {
            controller.abort();
        };
    }, [controller]);

    return { loading, errors, fetchHandler };
};

export default useFetch;