import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useField } from 'formik';
function ImageUpload ({name, classes}) {
  const [{ value, ...field }, meta, helpers] = useField(name);
  const { uploadContainer, inputContainer, imgStyle } = classes;
  const [imageSrc, setImageSrc] = useState('');

  const onChange = (e) => {
    const file = e.target.files[0];
    const imageType = /image.*/;

    if (!file.type.match(imageType)) {
      e.target.value = '';
    } else {
      helpers.setValue(file);

      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!meta.value) {
      setImageSrc('');
    }
  }, [meta.value]);

  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.png, *.gif, *.jpeg)</span>
        <input
          {...field}
          id="fileInput"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={onChange}
        />
        <label htmlFor="fileInput">Choose file</label>
      </div>
      {imageSrc && (
        <img
          id="imagePreview"
          src={imageSrc}
          className={classNames({ [imgStyle]: !!imageSrc })}
          alt="user"
        />
      )}
    </div>
  );
};

export default ImageUpload;
