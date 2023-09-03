import {
  deleteMovieById,
  getAllMovies,
  getMovieById,
  modifyMovie,
  uploadMovie,
} from "@/lib/movie.actions";
import {
  deleteDirectorById,
  getAllDirectors,
  getDirectorById,
  modifyDirector,
  uploadDirector,
} from "@/lib/director.actions";
import {
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  modifyCategory,
  uploadCategory,
} from "@/lib/category.actions";
import {
  deleteActorById,
  getActorById,
  getAllActors,
  modifyActor,
  uploadActor,
} from "@/lib/actor.actions";

export const adminDataStructure = [
  {
    table: "movie",
    uploadBranchData: async function (values: any) {
      const res = await uploadMovie({ values });
      return res;
    },
    getBranchData: async function () {
      const res = await getAllMovies();
      return res;
    },
    getBranchDataById: async function (id: string) {
      const res = await getMovieById(id);
      return res;
    },
    modifyBranchData: async function (id: string, values: any) {
      const res = await modifyMovie(id, values);
      return res;
    },
    deleteBranchItem: async function (id: string) {
      const res = await deleteMovieById(id);
      return res;
    },
    inputs: [
      {
        id: 1,
        name: "name",
        type: "text",
        placeholder: "Movie name",
        errorMessage: "Movie should have 2-46 characters",
        label: "Movie name",
        pattern: ".{2,46}",
        required: true,
      },
      {
        id: 2,
        name: "overview",
        type: "textarea",
        placeholder: "About the movie",
        errorMessage: "It should have 128-512 characters",
        label: "Movie Overview",
        minLength: "128",
        maxLength: "512",
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
        pattern: "\\b(?:3[0-9]|[4-9][0-9]|1\\d{2}|2[0-3]\\d|240)\\b",
        required: true,
      },
      {
        id: 5,
        name: "cover",
        type: "file",
        placeholder: "Add profile photo",
        errorMessage: "This field is required",
        label: "Upload cover of movie",
        required: true,
      },
      {
        id: 6,
        name: "director",
        type: "checkbox",
        errorMessage: "This field is required",
        label: "Select director of movie",
        dataLimit: 1,
        required: true,
      },
      {
        id: 7,
        name: "category",
        type: "checkbox",
        errorMessage: "This field is required",
        label: "Select category of movie",
        dataLimit: 0,
        required: true,
      },
      {
        id: 8,
        name: "actor",
        type: "checkbox",
        errorMessage: "This field is required",
        label: "Select actor of movie",
        dataLimit: 0,
        required: true,
      },
    ],
  },
  {
    table: "director",
    uploadBranchData: async function (values: any) {
      const res = await uploadDirector({ values });
      return res;
    },
    getBranchData: async function () {
      const res = await getAllDirectors();
      return res;
    },
    getBranchDataById: async function (id: string) {
      const res = await getDirectorById(id);
      return res;
    },
    modifyBranchData: async function (id: string, values: any) {
      const res = await modifyDirector(id, values);
      return res;
    },
    deleteBranchItem: async function (id: string) {
      const res = await deleteDirectorById(id);
      return res;
    },
    inputs: [
      {
        id: 1,
        name: "name",
        type: "text",
        placeholder: "Insert director name",
        errorMessage: "The director name should have 2-36 characters",
        label: "Director name",
        pattern: ".{2,36}",
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
        errorMessage: "It should have 128-512 characters",
        label: "Short bio",
        minLength: "128",
        maxLength: "512",
        required: true,
      },
    ],
  },
  {
    table: "category",
    uploadBranchData: async function (values: any) {
      const res = await uploadCategory({ values });
      return res;
    },
    getBranchData: async function () {
      const res = await getAllCategories();
      return res;
    },
    getBranchDataById: async function (id: string) {
      const res = await getCategoryById(id);
      return res;
    },
    modifyBranchData: async function (id: string, values: any) {
      const res = await modifyCategory(id, values);
      return res;
    },
    deleteBranchItem: async function (id: string) {
      const res = await deleteCategoryById(id);
      return res;
    },
    inputs: [
      {
        id: 1,
        name: "name",
        type: "text",
        placeholder: "Insert category name",
        errorMessage: "The category name should have 3-13 characters",
        label: "Category name",
        pattern: ".{3,13}",
        required: true,
      },
    ],
  },
  {
    table: "actor",
    uploadBranchData: async function (values: any) {
      const res = await uploadActor({ values });
      return res;
    },
    getBranchData: async function () {
      const res = await getAllActors();
      return res;
    },
    getBranchDataById: async function (id: string) {
      const res = await getActorById(id);
      return res;
    },
    modifyBranchData: async function (id: string, values: any) {
      const res = await modifyActor(id, values);
      return res;
    },
    deleteBranchItem: async function (id: string) {
      const res = await deleteActorById(id);
      return res;
    },
    inputs: [
      {
        id: 1,
        name: "name",
        type: "text",
        placeholder: "Insert actor name",
        errorMessage: "The actor name should have 2-36 characters",
        label: "Actor name",
        pattern: ".{2,36}",
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
        errorMessage: "It should have 128-512 characters",
        label: "Short bio",
        minLength: "128",
        maxLength: "512",
        required: true,
      },
    ],
  },
];

export const initialValue = {
  movie: {
    name: "",
    overview: "",
    year: 0,
    duration: 0,
    cover: {
      public_id: "",
      secure_url: "",
    },
  },
  director: {
    name: "",
    born: 0,
    bio: "",
  },
  category: {
    name: "",
  },
  actor: {
    name: "",
    born: 0,
    bio: "",
  },
};
export const initialValueArray = {
  movie: [
    {
      id: "",
      name: "",
      overview: "",
      year: 0,
      duration: 0,
      cover: {
        public_id: "",
        secure_url: "",
      },
    },
  ],
  director: [
    {
      id: "",
      name: "",
      born: 0,
      bio: "",
    },
  ],
  category: [
    {
      id: "",
      name: "",
    },
  ],
  actor: [
    {
      id: "",
      name: "",
      born: 0,
      bio: "",
    },
  ],
};
