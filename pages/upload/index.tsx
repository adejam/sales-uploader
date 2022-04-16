import React, { MutableRefObject, useEffect, useRef, useState } from "react";

interface BatchInfo {
  progress?: number
  id?: string
}

function UploadCsv() {
  const API_URL = "http://laravel.job-batching.backend:8000/api";
  const [batchInfo, setbatchInfo] = useState<BatchInfo>({});
  const [isUpLoading, setIsUpLoading] = useState(false)
  const csvRef: any = useRef();
  const uploadProgressInterval: any = useRef("")

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    setIsUpLoading(true)
    const inputFile = csvRef.current;
    const file = inputFile.files[0];
    if (!file) return;
    const formData: any = new FormData();
    formData.append("mycsv", file);
    // console.log(formData);
    fetch(`${API_URL}/upload`, { method: "post", body: formData })
      .then((res) => res.json())
      .then((data) => {
        setbatchInfo({...batchInfo, id: data.id, progress: data.progress})
        setIsUpLoading(false)
        console.log(batchInfo)
      });
    e.target.reset();
  };

  const getBatchInfo = (id = ""): void => {
    const currentId = id || batchInfo.id
    console.log(id);
    fetch(`${API_URL}/batch?id=${currentId}`)
      .then((res) => res.json())
      .then((data) => {
        setbatchInfo({...batchInfo, id: batchInfo.id, progress: data.progress})
        console.log(batchInfo)
        if (data.progress >= 100) {
          clearInterval(uploadProgressInterval.current);
        }
    });
  };

  

  const updateProgress = () => {
    if (uploadProgressInterval.current) return;
    uploadProgressInterval.current =  setInterval(() => {
      // if(batchInfo.progress && batchInfo.progress <= 100) {
        console.log("refreshing");
        getBatchInfo();
      // }
    }, 2000)
    
    
  }

  useEffect(() => {
    if (batchInfo.id) {
      console.log(batchInfo.progress)
      updateProgress()
    }
  }, [batchInfo.id]);

  useEffect(() => {
    fetch(`${API_URL}/batch/in-progress`)
      .then((res) => res.json())
      .then((data) => {
        setbatchInfo({...batchInfo, id: data.id, progress: data.progress })
    });
  }, [])
  

  return (
    <section className="m-auto">
      {batchInfo.progress !== undefined ? (
        <section>
          <h1 className="text-xl text-gray-800 text-center mb-5">
            Upload In Progress ({`${batchInfo.progress}%`})
          </h1>
          <div className="w-ful h-4 rounded-lg shadow-inner border">
            <div className="bg-blue-700 w-full h-4 rounded-lg" style={{width: `${batchInfo.progress}%`}}></div>
          </div>
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
              className={`px-4 py-2 ${isUpLoading ? 'bg-gray-400 outline-none' : 'bg-gray-700'} rounded text-white`}
            />
          </form>
        </section>
      )}
    </section>
  );
}

export default UploadCsv;
