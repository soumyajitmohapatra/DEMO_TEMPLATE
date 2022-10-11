import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  TextField,
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
  InputLabel,
  Grid,
} from "@mui/material";
import { useEffect } from "react";

const DynamicForm = ({ config, formik }) => {
  const getTouchedObj = (errors) => {
    const touched = {};
    Object.keys(errors).map((key) => {
      touched[key] = true;
      if (Array.isArray(errors[key])) {
        errors[key].map((val, index) => {
          if (index == 0) touched[key] = [];
          touched[key].push(getTouchedObj(val));
        });
      } else {
        touched[key] = true;
      }
    });

    return touched;
  };
  useEffect(() => {
    if (Object.keys(formik.errors).length) {
      formik.setTouched(getTouchedObj(formik.errors));
    }
  }, [formik.isSubmitting]);
  const builder = (individualConfig) => {
    switch (individualConfig.type) {
      case "text":
        return (
          <Grid
            key={individualConfig.id}
            item
            xs={individualConfig.style.xs}
            md={individualConfig.style.md}
          >
            <TextField
              fullWidth
              id="outlined-required"
              label={individualConfig.label}
              type="text"
              name={individualConfig.field}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // style={{ ...individualConfig.style }}
              size="small"
              error={
                formik.errors[individualConfig.field] &&
                formik.touched[individualConfig.field]
              }
              helperText={
                formik.touched[individualConfig.field] &&
                formik.errors[individualConfig.field]
              }
            />
          </Grid>
        );
      case "number":
        return (
          <Grid
            key={individualConfig.id}
            item
            xs={individualConfig.style.xs}
            md={individualConfig.style.md}
          >
            <TextField
              fullWidth
              id="outlined-required"
              label={individualConfig.label}
              type="number"
              name={individualConfig.field}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // style={{ ...individualConfig.style }}
              size="small"
              error={
                formik.errors[individualConfig.field] &&
                formik.touched[individualConfig.field]
              }
              helperText={
                formik.touched[individualConfig.field] &&
                formik.errors[individualConfig.field]
              }
            />
          </Grid>
        );
      case "checkbox":
        return (
          <FormControlLabel
            key={individualConfig.id}
            control={
              <Checkbox
                name={individualConfig.field}
                value={individualConfig.value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            }
            label={individualConfig.label}
          />
        );
      case "radio":
        return (
          <FormControlLabel
            key={individualConfig.id}
            control={
              <Radio
                name={individualConfig.field}
                value={individualConfig.value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            }
            label={individualConfig.label}
          />
        );
      case "array":
        switch (individualConfig.variant) {
          case "radio":
            return (
              <Grid
                key={individualConfig.id}
                item
                xs={individualConfig.style.xs}
                md={individualConfig.style.md}
              >
                <RadioGroup
                  row
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DynamicForm
                    config={individualConfig.children || []}
                    formik={formik}
                  />
                </RadioGroup>
              </Grid>
            );
          case "checkbox":
            return (
              <Grid
                key={individualConfig.id}
                item
                xs={individualConfig.style.xs}
                md={individualConfig.style.md}
              >
                <FormGroup
                  row
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DynamicForm
                    config={individualConfig.children || []}
                    formik={formik}
                  />
                </FormGroup>
              </Grid>
            );
          case "select":
            return (
              <Grid
                key={individualConfig.id}
                item
                xs={individualConfig.style.xs}
                md={individualConfig.style.md}
              >
                <FormControl
                  fullWidth
                  size="small"
                  error={
                    formik.errors[individualConfig.field] &&
                    formik.touched[individualConfig.field]
                  }
                >
                  <InputLabel id={individualConfig.field}>
                    {individualConfig.label}
                  </InputLabel>
                  <Select
                    size="small"
                    id={individualConfig.field}
                    name={individualConfig.field}
                    label={individualConfig.label}
                    value={
                      formik.values[individualConfig.field]
                        ? formik.values[individualConfig.field]
                        : ""
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {individualConfig.children &&
                    individualConfig.children.length
                      ? individualConfig.children.map((ele) => (
                          <MenuItem
                            key={ele.id}
                            name={ele.field}
                            value={ele.value}
                          >
                            {ele.label}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                  <FormHelperText>
                    {formik.touched[individualConfig.field] &&
                      formik.errors[individualConfig.field]}
                  </FormHelperText>
                </FormControl>
              </Grid>
            );
        }

      default:
        return <div key={individualConfig.id}>Unsupported field</div>;
    }
  };

  return (
    <>
      {config.map((c) => {
        return builder(c);
      })}
    </>
  );
};

export default DynamicForm;
