import { useEffect, useState } from "react";
import { Tree as MainTree, TreeNode } from "react-organizational-chart";
import useFetch from "../../hooks/useFetch";
import "./Tree.css";

const Tree = () => {
    const [devices, setDevices] = useState([]);
    const { fetchHandler } = useFetch();

    useEffect(() => {
        fetchHandler("http://localhost:8000/").then(res => setDevices(res)).catch(err => console.log(err))
    }, [fetchHandler]);

    return (
        <MainTree
            lineWidth={'2px'}
            lineColor={'green'}
            lineBorderRadius={'10px'}
            label={<div className="element">Root</div>}
        >
            {
                devices?.length > 0 && devices.map((item, index) => (
                    <TreeNode key={index} label={
                        <div className="element">
                            <div>Vendor Id: {item.vendorId}</div>
                            <hr />
                            <div>Product Id: {item.productId}</div>
                            <hr />
                            <div>Descriptor: {item.descriptor}</div>
                            <hr />
                            <div>Type: {item.type}</div>
                        </div>
                    } />
                ))
            }
        </MainTree>
    );
};

export default Tree;