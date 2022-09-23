export default [
  {
    id: "1cgfut",
    section_title: "Personal Info",
    type: "group",
    children: [
      {
        id: "1234",
        type: "text",
        field: "first_name",
        label: "Firstname",
        style: {
          xs: 12,
          md: 6,
        },
        validationType: "string",
        validations: [
          {
            type: "required",
            params: ["Firstname is required"],
          },
        ],
      },
      {
        id: "123ddas4",
        type: "text",
        field: "last_name",
        label: "Lastname",
        style: {
          xs: 12,
          md: 6,
        },
        validationType: "string",
        validations: [
          {
            type: "required",
            params: ["Lastname is required"],
          },
        ],
      },
      {
        id: "45",
        type: "number",
        field: "age",
        label: "Age",
        style: {
          xs: 6,
          md: 4,
        },
        validationType: "number",
        validations: [
          {
            type: "required",
            params: ["Age is required"],
          },
          {
            type: "min",
            params: [18, "Min age is 18"],
          },
          {
            type: "max",
            params: [60, "Max age is 50"],
          },
        ],
      },
      {
        id: "1gfgddas4",
        type: "text",
        field: "blood_gro",
        label: "Blood Group",
        style: {
          xs: 6,
          md: 4,
        },
        validationType: "string",
        validations: [
          {
            type: "required",
            params: ["Blood Group is required"],
          },
        ],
      },
      {
        id: "1aaaa1hff",
        type: "array",
        variant: "select",
        field: "gender",
        label: "Gender",
        style: {
          xs: 12,
          md: 4,
        },
        validationType: "string",
        validations: [
          {
            type: "required",
            params: ["Gender is required"],
          },
        ],
        children: [
          {
            id: "gd222212",
            type: "select",
            field: "gender",
            label: "Male",
            value: "M",
          },
          {
            id: "ggdg",
            type: "select",
            field: "gender",
            label: "Female",
            value: "F",
          },
        ],
      },
      {
        id: "fgyff646",
        type: "text",
        field: "email",
        label: "User's Email",
        style: {
          xs: 12,
          md: 12,
        },
        validationType: "string",
        validations: [
          {
            type: "email",
            params: ["A valid email is required"],
          },
          {
            type: "required",
            params: ["Email is required"],
          },
        ],
      },
    ],
  },
  {
    id: "fgdfig721",
    section_title: "Address",
    type: "group",
    children: [
      {
        id: "1234",
        type: "text",
        field: "address_line1",
        label: "Address Line1",
        style: {
          xs: 12,
          md: 12,
        },
        validationType: "string",
        validations: [
          {
            type: "required",
            params: ["Address is required"],
          },
        ],
      },
      {
        id: "123ddas4",
        type: "text",
        field: "address_line2",
        label: "Address Line2",
        style: {
          xs: 12,
          md: 12,
        },
        validationType: "string",
        validations: [
          {
            type: "required",
            params: ["Address is required"],
          },
        ],
      },
      {
        id: "45",
        type: "number",
        field: "zipcode",
        label: "Zipcode",
        style: {
          xs: 6,
          md: 4,
        },
        validationType: "number",
        validations: [
          {
            type: "required",
            params: ["Zipcode is required"],
          },
        ],
      },
      {
        id: "sdjug739",
        type: "text",
        field: "city",
        label: "City",
        style: {
          xs: 6,
          md: 4,
        },
        validationType: "string",
        validations: [
          {
            type: "required",
            params: ["City is required"],
          },
        ],
      },
      {
        id: "sf3t7dyd37",
        type: "text",
        field: "state",
        label: "State",
        style: {
          xs: 6,
          md: 4,
        },
        validationType: "string",
        validations: [
          {
            type: "required",
            params: ["State is required"],
          },
        ],
      },
    ],
  },
];
