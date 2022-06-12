export async function getBase64Image(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        resolve(fileReader.result);
      };
  
      fileReader.onerror = (err) => {
        reject(err);
      }
    });
}

export async function getBase64ImagesArray(files) {
    return new Promise((resolve) => {
        const base64files = files.map((file)=>{
            const base64file = getBase64Image(file)
            return base64file
        })
        resolve(base64files)
    })
}