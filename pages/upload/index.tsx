import React, { useEffect, useRef, useState } from "react";

interface BatchInfo {
  progress?: number
  id?: string
}

function UploadCsv() {
  const API_URL = "http://laravel.job-batching.backend:8000/api";
  const [batchInfo, setbatchInfo] = useState<BatchInfo>({});
  const csvRef: any = useRef();

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    const inputFile = csvRef.current;
    const file = inputFile.files[0];
    if (!file) return;
    const formData: any = new FormData();
    formData.append("mycsv", file);
    // console.log(formData);
    fetch(`${API_URL}/upload`, { method: "post", body: formData })
      .then((res) => res.json())
      .then((data) => {
        setbatchInfo({...batchInfo, id: data.id})
        getBatchInfo(data.id)
      });
  };

  const getBatchInfo = (id = ""): void => {
    const currentId = id || batchInfo.id
    fetch(`${API_URL}/batch?id=${currentId}`)
      .then((res) => res.json())
      .then((data) => setbatchInfo({...batchInfo, progress: data.progress}));
  };

  useEffect(() => {
    const refreshProgress =  setInterval(() => {
      if(batchInfo.progress && batchInfo.progress !== 100) {
        getBatchInfo(batchInfo.id);
      }
    }, 2000)

    return () => clearInterval(refreshProgress);
    
  }, []);

  return (
    <section className="m-auto">
      {batchInfo.progress ? (
        <section>
          <h1 className="text-xl text-gray-800 text-center mb-5">
            Upload In Progress ({`${batchInfo.progress}%`})
          </h1>
          <progress value={batchInfo.progress}></progress>
        </section>
      ) : (
        <section>
          <h1 className="text-xl text-gray-800 text-center mb-5">
            Upload a file
          </h1>
          <form className="border rounded p-4" onSubmit={handleSubmit}>
            <input type="file" ref={csvRef} />
            <input
              type="submit"
              value="Upload"
              className="px-4 py-2 bg-gray-700 rounded text-white"
            />
          </form>
        </section>
      )}
    </section>
  );
}

export default UploadCsv;
