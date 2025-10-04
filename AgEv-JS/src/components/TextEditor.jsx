import React from "react";
import { Controller } from "react-hook-form";
import ErrorMessage from "./Error/ErrorMessage";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const TextEditor = ({ control, name, label, errorMessage = "" }) => {
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      <div className="editor-wrapper">
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={{ required: "This field is required" }}
          render={({ field: { onChange, value } }) => (
            <CKEditor
              editor={ClassicEditor}
              data={value}
              onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data);
              }}
            />
          )}
        />
      </div>
      <div className="mt-11">
        <ErrorMessage message={errorMessage} />
      </div>
    </div>
  );
};

export default TextEditor;
