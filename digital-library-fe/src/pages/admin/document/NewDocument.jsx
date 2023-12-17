import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "../../../components/management/select/Select";

import { getAllCategories } from "../../../api/main/categoryAPI";
import { uploadNewDocument } from "../../../api/main/documentAPI";
import { getAllFields } from "../../../api/main/fieldAPI";
import { getAccessibleOrganizations } from "../../../api/main/organizationAPI";
import usePrivateAxios from "../../../api/usePrivateAxios";

import { Button, Toast } from "flowbite-react";
import { HiExclamation, HiOutlineCloudUpload, HiChevronUp, HiChevronLeft } from "react-icons/hi";

const NewDocument = () => {
    usePrivateAxios();

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [organizationId, setOrganizationId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [fieldId, setFieldId] = useState("");
    const [isInternal, setIsInternal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [organizationList, setOrganizationList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [fieldList, setFieldList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(0);

    const [isNameValid, setIsNameValid] = useState(true);
    const [isIntroductionValid, setIsIntroductionValid] = useState(true);
    const [isOrganizationValid, setIsOrganizationValid] = useState(true);
    const [isCategoryValid, setIsCategoryValid] = useState(true);
    const [isFieldValid, setIsFieldValid] = useState(true);
    const [isFileValid, setIsFileValid] = useState(true);
    const [fileMessage, setFileMessage] = useState("");

    const getOrganizationList = async () => {
        try {
            const response = await getAccessibleOrganizations({
                params: {
                    page: 0,
                    size: 100,
                },
            });
            if (response.status === 200) {
                setOrganizationList(response.data);
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCategoryList = async () => {
        try {
            const response = await getAllCategories({
                params: {
                    page: 0,
                    size: 100,
                },
            });
            if (response.status === 200) {
                setCategoryList(response.data);
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getFieldList = async () => {
        try {
            const response = await getAllFields({
                params: {
                    page: 0,
                    size: 100,
                },
            });
            if (response.status === 200) {
                setFieldList(response.data);
            } else {
            }
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        getCategoryList();
        getFieldList();
        getOrganizationList();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const validateName = () => {
        if (name === "" || name.trim() === "") {
            setIsNameValid(false);
        } else {
            setIsNameValid(true);
        }
    };

    const validateIntroduction = () => {
        if (introduction === "" || introduction.trim() === "") {
            setIsIntroductionValid(false);
        } else {
            setIsIntroductionValid(true);
        }
    };

    const validateOraganization = () => {
        if (organizationId === "") {
            setIsOrganizationValid(false);
        } else {
            setIsOrganizationValid(true);
        }
    };

    const validateCategory = () => {
        if (categoryId === "") {
            setIsCategoryValid(false);
        } else {
            setIsCategoryValid(true);
        }
    };

    const validateField = () => {
        if (fieldId === "") {
            setIsFieldValid(false);
        } else {
            setIsFieldValid(true);
        }
    };

    const validateFile = () => {
        if (selectedFile === null) {
            setFileMessage("Vui lòng chọn tệp");
            return false;
        } else if (selectedFile.size > 100 * 1024 * 1024 || selectedFile.size === 0) {
            setFileMessage("Vui lòng chọn tệp hợp lệ và nhỏ hơn 100MB");
            return false;
        } else {
            return true;
        }
    };

    const validateInput = () => {
        validateName();
        validateIntroduction();
        validateOraganization();
        validateCategory();
        validateField();
        setIsFileValid(validateFile());

        if (!isNameValid || !isIntroductionValid || !isOrganizationValid || !isCategoryValid || !isFieldValid || !validateFile()) {
            return false;
        } else {
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateInput()) {
            setIsLoading(true);

            try {
                const document = {
                    docName: name,
                    docIntroduction: introduction,
                    internal: isInternal,
                    orgId: organizationId,
                    categoryId: categoryId,
                    fieldId: fieldId,
                };

                const formData = new FormData();
                formData.append("document", JSON.stringify(document));
                formData.append("file", selectedFile);

                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                };

                const response = await uploadNewDocument(formData, config);

                setIsLoading(false);

                if (response.status === 200) {
                    setStatus(1);
                    setTimeout(() => {
                        navigate(-1);
                    }, 2000);
                } else {
                    setStatus(-1);
                    setTimeout(() => {
                        setStatus(0);
                    }, 2000);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="grid place-items-center">
            <h1 className="mb-10 text-3xl font-bold dark:text-white ">Tài liệu mới</h1>

            {status === -1 && (
                <Toast className="top-1/4 right-5 w-100 fixed z-50">
                    <HiExclamation className="h-5 w-5 text-amber-400 dark:text-amber-300" />
                    <div className="pl-4 text-sm font-normal">Đã xảy ra lỗi! Xin vui lòng thử lại!</div>
                </Toast>
            )}

            {status === 1 && (
                <Toast className="top-1/4 right-5 fixed w-100 z-50">
                    <HiOutlineCloudUpload className="h-5 w-5 text-green-600 dark:text-green-500" />
                    <div className="pl-4 text-sm font-normal">Tải lên thành công!</div>
                </Toast>
            )}

            <div className="row w-2/3">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label htmlFor="website-admin" className="block mb-2 text-sm font-medium dark:text-white">
                                        Tên tài liệu
                                    </label>
                                    <div className="flex">
                                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                            <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.546l3.2 3.659a1 1 0 0 0 1.506 0L13.454 14H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-8 10H5a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Zm5-4H5a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2Z" />
                                            </svg>
                                        </span>
                                        <input
                                            type="text"
                                            id="website-admin"
                                            className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Nhập tên tài liệu..."
                                            minLength={1}
                                            maxLength={255}
                                            required
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                            value={name}
                                        />
                                    </div>
                                    {!isNameValid && <p className="block mt-2 text-sm font-medium text-red-600 italic">* Vui lòng nhập tên</p>}
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="message" className="block mb-2 text-sm font-medium dark:text-white">
                                        Mô tả
                                    </label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Nhập mô tả..."
                                        required
                                        onChange={(e) => {
                                            setIntroduction(e.target.value);
                                        }}
                                        value={introduction}></textarea>
                                    {!isIntroductionValid && <p className="block mt-2 text-sm font-medium text-red-600 italic">* Vui lòng nhập mô tả</p>}
                                </div>

                                <div className="mb-6">
                                    <Select
                                        selectName="Trường học"
                                        options={organizationList}
                                        selectedValue={organizationId}
                                        onChangeHandler={(e) => {
                                            setOrganizationId(e.target.value);
                                        }}
                                        name="orgName"
                                        field="orgId"
                                        required
                                    />
                                    {!isOrganizationValid && <p className="block mt-2 text-sm font-medium text-red-600 italic">* Vui lòng chọn trường học</p>}
                                </div>

                                <div className="mb-6">
                                    {" "}
                                    <Select
                                        selectName="Danh mục"
                                        options={categoryList}
                                        selectedValue={categoryId}
                                        onChangeHandler={(e) => {
                                            setCategoryId(e.target.value);
                                        }}
                                        name="categoryName"
                                        field="categoryId"
                                        required
                                    />
                                    {!isCategoryValid && <p className="block mt-2 text-sm font-medium text-red-600 italic">* Vui lòng chọn danh mục</p>}
                                </div>

                                <div className="mb-6">
                                    <Select
                                        selectName="Lĩnh vực"
                                        options={fieldList}
                                        selectedValue={fieldId}
                                        onChangeHandler={(e) => {
                                            setFieldId(e.target.value);
                                        }}
                                        name="fieldName"
                                        field="fieldId"
                                        required
                                    />
                                    {!isFieldValid && <p className="block mt-2 text-sm font-medium text-red-600 italic">* Vui lòng chọn lĩnh vực</p>}
                                </div>

                                <div className="mb-6 mt-6">
                                    <label className="block mb-2 text-sm font-medium dark:text-white">Chọn đối tượng xem tài liệu</label>
                                    <label className="block mb-2 text-xs font-normal italic dark:text-white">* Công khai dành cho tất cả mọi người, nội bộ chỉ dành cho trong trường</label>
                                    <div className="flex gap-x-6">
                                        <div className="flex">
                                            <input
                                                type="radio"
                                                name="hs-radio-group"
                                                className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                                id="hs-radio-group-1"
                                                checked={!isInternal}
                                                value="false"
                                                onChange={() => setIsInternal(false)}
                                            />
                                            <label htmlFor="hs-radio-group-1" className="text-sm text-gray-500 ms-2 dark:text-gray-400">
                                                Công khai
                                            </label>
                                        </div>

                                        <div className="flex">
                                            <input
                                                type="radio"
                                                name="hs-radio-group"
                                                className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                                id="hs-radio-group-2"
                                                checked={isInternal}
                                                value="true"
                                                onChange={() => setIsInternal(true)}
                                            />
                                            <label htmlFor="hs-radio-group-2" className="text-sm text-gray-500 ms-2 dark:text-gray-400">
                                                Nội bộ
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="dropzone-file" className="block mb-2 text-sm font-medium dark:text-white">
                                        Chọn tệp
                                    </label>
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            htmlFor="dropzone-file"
                                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-medium text-green-500 dark:text-gray-400">
                                                    <span className="font-semibold">Nhấn để tải lên</span>
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{selectedFile ? `Tệp đã chọn: ${selectedFile.name}` : "PDF (tối đa 100MB)"}</p>
                                            </div>
                                            <input id="dropzone-file" type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
                                        </label>
                                    </div>
                                    {!isFileValid && <p className="block mt-2 text-sm font-medium text-red-600 italic">* {fileMessage}</p>}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <Button disabled={isLoading} color="failure" className="w-auto" onClick={() => navigate(-1)}>
                                        <HiChevronLeft className="mr-2 h-5 w-5" />
                                        Huỷ bỏ
                                    </Button>

                                    <Button type="submit" isProcessing={isLoading} color="success" className="w-auto">
                                        Lưu
                                        <HiChevronUp className="ml-2 h-5 w-5" />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewDocument;
