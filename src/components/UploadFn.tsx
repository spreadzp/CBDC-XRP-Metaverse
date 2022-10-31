import { useState, useEffect } from 'react'; 
import  {create} from 'ipfs-core';

const UploadFn = () => {
  const [hash, setHash] = useState("");
  const [fileName, setFileName] = useState("");
  const [pathFileName, setPathFileName] = useState([]);

  useEffect(() => {
    console.log('#######################pathFileName :>> ', pathFileName);
    const saveToIpfsWithFilename = async ([file]: any) => {
      const fileDetails = {
        path: file.name,
        content: file
      }
      const options: any = {
        wrapWithDirectory: true,
        progress: (prog: string) => console.log(`received: ${prog}`)
      }
      const ipfs = await create()
      const { cid } = await ipfs.add(fileDetails, options)
      console.log("🚀 ~ file: UploadFn.tsx ~ line 23 ~ saveToIpfsWithFilename ~ cid", cid)
      const result = { hash: cid.toString(), fileName: fileDetails.path }

      return result;
    }

    const captureFile = async (files: any) => {
      const data = await saveToIpfsWithFilename(files);
      setHash(data.hash);
      setFileName(data.fileName);
    }

    if (pathFileName.length) {
      captureFile(pathFileName);
    }

  }, [pathFileName]);

  const handelChangeFile = (e: any) => {
    setPathFileName(e.target.files);
  }

  return (
    <div className="App">
      <form>
        <input type='file' name='input-file' onChange={handelChangeFile} /> 
      </form>
      <div>
        <a target='_blank' rel="noreferrer"
          href={'https://ipfs.io/ipfs/' + hash + "/" + fileName}> {hash}
        </a>
      </div>
    </div>
  );
}

export default UploadFn;
