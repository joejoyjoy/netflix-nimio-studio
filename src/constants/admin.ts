export const adminDataStructure = [
  {
    table: "movie",
    inputs: [
      {
        id: 1,
        name: "title",
        type: "text",
        placeholder: "Movie title",
        errorMessage:
          "Movie should have 2-46 characters and shouldn't include any special character!",
        label: "Movie Title",
        pattern: "^[A-Za-z0-9\-.,]{2,46}$",
        required: true,
      },
      {
        id: 2,
        name: "overview",
        type: "textarea",
        placeholder: "About the movie",
        errorMessage: "It should have 128-512 characters and shouldn't include any special character!",
        label: "Movie Overview",
        pattern: "^[A-Za-z0-9 ,.'-]{128,512}$",
        required: true,
      },
      {
        id: 3,
        name: "year",
        type: "text",
        placeholder: "Year of release",
        errorMessage: "It should be only numbers between 1970 and 2024",
        label: "Year of release",
        pattern: "^(197[0-9]|198[0-9]|199[0-9]|200[0-9]|201[0-9]|202[0-3])$",
        required: true,
      },
      {
        id: 4,
        name: "duration",
        type: "text",
        placeholder: "Full duration of movie in minutes",
        errorMessage: "It should be only numbers between 30 and 240 minutes",
        label: "Duration in minutes",
        pattern: "\b(?:3[0-9]|[4-9][0-9]|1\d{2}|2[0-3]\d|240)\b",
        required: true,
      },
      {
        id: 5,
        name: "cover",
        type: "file",
        errorMessage: "This field is required",
        label: "Upload cover of movie",
        required: true,
      },
    ]
  },
  {
    table: "director",
    inputs: [
      {
        id: 1,
        name: "name",
        type: "text",
        placeholder: "Insert director name",
        errorMessage:
          "The director name should have 2-36 characters and shouldn't include any special character!",
        label: "Director name",
        pattern: "^[a-zA-Z' -]{2,36}$",
        required: true,
      },
      {
        id: 2,
        name: "born",
        type: "text",
        placeholder: "Year of birth",
        errorMessage: "It should be only numbers between 1860 and 2010",
        label: "Director year",
        pattern: "^(186[0-9]|18[7-9][0-9]|19[0-9]{2}|200[0-9]|2010)$",
        required: true,
      },
      {
        id: 3,
        name: "bio",
        type: "textarea",
        placeholder: "Bio about movie director",
        errorMessage: "It should have 128-512 characters and shouldn't include any special character!",
        label: "Short bio",
        pattern: "^[A-Za-z0-9 ,.'-]{128,512}$",
        required: true,
      }
    ]
  },
  {
    table: "category",
    inputs: [
      {
        id: 1,
        name: "name",
        type: "text",
        placeholder: "Insert category name",
        errorMessage:
          "The category name should have 3-13 characters and shouldn't include any special character!",
        label: "Category name",
        pattern: "^[a-zA-Z -]{3,13}$",
        required: true,
      }
    ]
  },
  {
    table: "actors",
    inputs: [
      {
        id: 1,
        name: "name",
        type: "text",
        placeholder: "Insert actor name",
        errorMessage:
          "The actor name should have 2-36 characters and shouldn't include any special character!",
        label: "Actor name",
        pattern: "^[a-zA-Z' -]{2,36}$",
        required: true,
      },
      {
        id: 2,
        name: "born",
        type: "text",
        placeholder: "Year of birth",
        errorMessage: "It should be only numbers between 1860 and 2010",
        label: "Actor year",
        pattern: "^(186[0-9]|18[7-9][0-9]|19[0-9]{2}|200[0-9]|2010)$",
        required: true,
      },
      {
        id: 3,
        name: "bio",
        type: "textarea",
        placeholder: "Bio about the actor",
        errorMessage: "It should have 128-512 characters and shouldn't include any special character!",
        label: "Short bio",
        pattern: "^[A-Za-z0-9 ,.'-]{128,512}$",
        required: true,
      }
    ]
  }
];
