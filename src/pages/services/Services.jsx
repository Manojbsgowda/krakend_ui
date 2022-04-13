import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import "./services.css";

import React from "react";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import baseUrl, { defaultPort, defaultVersion } from "../../constants";
import { toast } from "react-toastify";
import { useFormik } from "formik";

const Services = () => {
  const validate = (values) => {
    const errors = {};
    if (!values.host_name) {
      errors.host_name = "Required";
    } else if (values.host_name.length > 15) {
      errors.host_name = "Must be 20 characters or less";
    }

    return errors;
  };

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      version: defaultVersion,
      port: defaultPort,
      service_name: "",
      host_name: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      const postServicesData = {
        version: values.version,
        port: values.port,
        serviceName: values.service_name,
        hostName: values.host_name,
      };
      baseUrl
        .post(`/services/create`, JSON.stringify(postServicesData, null, 2), {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((res) => {
          // setInputValues(initialState); //after submition set input to initial state
          toast.success(res.data?.message);
        })
        .catch((err) => {
          console.log(err);
        });

      navigate("/endpoint");
    },
  });
  return (
    <main className="services_container">
      <div class="services_title_container">
        <p id="s_para_1" className="s_title">
          Create An API
        </p>
      </div>
      <Paper elevation={3} sx={{ minWidth: "90%" }}>
        <Box
          component="form"
          sx={{ padding: 10 }}
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                id="version"
                name="version"
                label="Version"
                variant="outlined"
                fullWidth
                required
                // autoFocus
                value={formik.values.version}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className="service_textbox_hints">
                This is the URI your clients will connect to.
              </span>
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="port"
                name="port"
                label="Port "
                variant="outlined"
                fullWidth
                value={formik.values.port}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className="service_textbox_hints">
                This is the URI your clients will connect to.
              </span>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="service_name"
                name="service_name"
                label="Service Name"
                variant="outlined"
                fullWidth
                value={formik.values.service_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className="service_textbox_hints">
                This is the URI your clients will connect to.
              </span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="host_name"
                name="host_name"
                label="Host Name"
                variant="outlined"
                fullWidth
                placeholder="http:abc.com"
                required
                value={formik.values.host_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.errors.host_name ? formik.errors.host_name : null
                }
                error={formik.errors.host_name ? true : false}
              />
              <span className="service_textbox_hints">
                This is the URI your clients will connect to.
              </span>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Stack direction="row-reverse" spacing={2}>
                <Button color="secondary">Cancel</Button>
                <Button type="submit" variant="contained">
                  Next
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </main>
  );
};

export default Services;
