import React from "react";

export default function ViewAllItems() {
  return (
    <main className="responsive">
      <span className="responsive_wrapper mb-6">
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
