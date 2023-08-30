import React from "react";

export default function UploadItem() {
  return (
    <main className="responsive">
      <span className="responsive_wrapper flex items-center justify-between py-3 mb-6">
        #Upload movie

        ##Details about the movie
        title - Input Text
        overview - TextArea
        year - Input Number
        duration - Input Number
        cover - Upload File

        director - DropDown
          create: 
            name - Input Text
            born - Input Number
            bio - TextArea

        categories - DropDown
          create: 
            name - Input Text

        actors - DropDown
          create: 
          name - Input Text
          born - Input Number
          bio - TextArea

      </span>
    </main>
  );
}
