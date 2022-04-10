import React, { useState } from "react";
import { BsImages } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Upload(props) {
    const [image, setImage] = useState({ preview: "", raw: "" });

    const history = useNavigate();

    if (image.raw.length !== 0) {
        props.setload(true);
        const formData = new FormData();
        formData.append("Image", image.raw);
        axios.post("http://localhost:3001/api/", formData).then((res) => {
            props.setcode(res.data.code);
            props.setload(false);
            history("/results");
        });
    } else {
        history("/upload");
    }

    const handleChange = (e) => {
        if (e.target.files.length > 0) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0],
            });
        }
    };
    return (
        <div className="grid place-items-center text-white">

            <h1 className="text-4xl mt-10">Upload the image</h1>

            <p className="text-gray-200 text-2xl py-12">Upload the image for extracting th text</p>

            <div className="text-2xl cursor-pointer">

                <label htmlFor="upload-button" className="flex flex-row gap-2 bg-secondary px-4 py-2 rounded-md cursor-pointer">
                    <BsImages /> Upload this Image
                </label>

                <input
                    type="file"
                    id="upload-button"
                    style={{ display: "none" }}
                    onChange={handleChange}
                />
            </div>

        </div>
    );
}

export default Upload;
