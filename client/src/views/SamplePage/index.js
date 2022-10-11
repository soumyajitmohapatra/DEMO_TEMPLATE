import React, { Fragment } from "react";
import { useFormik } from "formik";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { getYupSchemaFromMetaData } from "../../component/Forms/yupSchemaCreator";
import DynamicForm from "../../component/Forms/DynamicForm";
import fieldData from "./fieldData";
import AnimatedButton from "../../common/buttons/AnimatedButton";
import { MdSend, MdCheckCircle } from "react-icons/md";

function SamplePage() {
  const signupSchema = getYupSchemaFromMetaData(fieldData, [], []);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setLoading(false);
        setSuccess(true);
      }, 2000);
    },
    validationSchema: signupSchema,
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(145deg, #e0f6ff, #bccfdd)",
          width: "40vw",
          padding: "2rem",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          margin: "1rem 0",
          boxShadow: "16px 16px 65px #86939d, -16px -16px 65px #ffffff",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            marginBottom={2}
          >
            {fieldData.map((ele) =>
              ele.type === "group" ? (
                <Fragment key={ele.id}>
                  <Grid item xs={12} md={12}>
                    <h4
                      style={{
                        margin: "1rem 0 0 0",
                        textAlign: "left",
                      }}
                    >
                      {ele.section_title}
                    </h4>
                  </Grid>
                  <DynamicForm config={ele.children} formik={formik} />
                </Fragment>
              ) : (
                <DynamicForm
                  config={ele.children}
                  formik={formik}
                  key={ele.id}
                />
              )
            )}
          </Grid>
          <AnimatedButton
            endIcon={success ? <MdCheckCircle /> : <MdSend />}
            loading={loading}
            variant="contained"
            type="submit"
            disabled={!formik.isValid || loading}
            buttonTitle={"Send"}
            style={{
              padding: ".4rem 1.5rem",
              marginTop: "1rem",
            }}
          />
        </form>
      </Box>
    </div>
  );
}

export default SamplePage;
