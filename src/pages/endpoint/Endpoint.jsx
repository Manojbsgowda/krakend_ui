import React, { useCallback, useState } from "react";
import "./endpoint.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { endpointAcordian } from "../../dummyData";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { FormControl } from "@mui/material";
import AlertDialogSlide from "../../components/dialog/Dialog";
import { IconButton } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import DeleteIcon from "@mui/icons-material/Delete";
import { Divider } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import AlertDialogSlideForEndpoint from "../../components/dialog/EndpointRatelimiting";

const initialEndpointValue = {
  krakend_endpoint: "",
  http_method: "",
  parameters: "",
  headers_passing_to_backend: "",
  concurrent_calls: "",
  backend_endpoint: "",
  endpoint_http_method: "",
};

const initialDialogValues = {
  rate_limit: "",
  user_quota: "",
};

const initialEndpointDialogValues = {
  endpoint_rate_limit: "",
  Capacity_burstsize: "",
};

const Endpoint = () => {
  const [getDialogInputValues, setgetDialogInputValues] =
    useState(initialDialogValues);
  const [getEndpointRatelimitDialog, setgetEndpointRatelimitDialog] = useState(
    initialEndpointDialogValues
  );

  const callbackDialog = useCallback((value) => {
    setgetDialogInputValues(value);
  });
  // console.log("dialogcallback", getDialogInputValues);

  const callbackEndpoint = useCallback((value) => {
    setgetEndpointRatelimitDialog(value);
  });
  // console.log("endpointcallback", getEndpointRatelimitDialog);

  const [expanded, setExpanded] = React.useState(false);
  const [endpointArray, setendpointArray] = React.useState([]);
  const [endpointInput, setEndpointInput] =
    React.useState(initialEndpointValue);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const createNewEndpoint = () => {
    setendpointArray([
      ...endpointArray,
      {
        id: uuidv4(),
        title1: "/v1/new-endpoint",
      },
    ]);
  };

  const handleEndpointInputs = (e) => {
    setEndpointInput({ ...endpointInput, [e.target.name]: e.target.value });
  };
  console.log(endpointInput);

  const deleteEndpoint = (id) => {
    setendpointArray(endpointArray.filter((item) => item.id !== id));
  };
  // console.log(endpointArray);

  const handleSubmit = (e) => {
    const data = {
      krakend_endpoint: endpointInput.krakend_endpoint,
      http_method: endpointInput.http_method,
      parameters: endpointInput.parameters,
      headers_passing_to_backend: endpointInput.headers_passing_to_backend,
      concurrent_calls: endpointInput.concurrent_calls,
      backend_endpoint: endpointInput.backend_endpoint,
      endpoint_http_method: endpointInput.endpoint_http_method,
      rate_limit: getDialogInputValues.rate_limit,
      user_quota: getDialogInputValues.user_quota,
      endpoint_rate_limit: getEndpointRatelimitDialog.endpoint_rate_limit,
      Capacity_burstsize: getEndpointRatelimitDialog.Capacity_burstsize,
    };
    console.log("each endpoints", data);
    setgetDialogInputValues(initialDialogValues);
    setgetEndpointRatelimitDialog(initialEndpointDialogValues);
    setEndpointInput(initialEndpointValue);
  };

  //   const endpointList = endpointAcordian;
  return (
    <main className="endpoint_container">
      <div class="endpoint_title_container">
        <p id="e_para_1" className="e_title">
          <b>Endpoints list</b>
        </p>
      </div>
      <div className="endpoint_acordian">
        {endpointArray.map((value, index) => {
          return (
            <Accordion
              key={value.id}
              expanded={expanded === value.id}
              onChange={handleChange(value.id)}
            >
              <AccordionSummary
                sx={{
                  backgroundColor: "#eee",
                  display: "flex",
                  alignContent: "center",
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography>{value.title1}</Typography>
                {/* <Typography sx={{ color: "text.secondary" }}>
                  {value.title2 ?? ""}
                </Typography> */}

                {/* delete button  */}
                <Box sx={{ flexGrow: 1 }} />
                <div style={{ marginRight: 0 }}>
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteEndpoint(value.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                {/* <Typography>{value.mainData ?? ""}</Typography> */}

                {/* add new end point form  */}

                <Box component="form" sx={{ marginTop: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={9}>
                      <TextField
                        id="krakend_endpoint"
                        name="krakend_endpoint"
                        label="Krakend endpoint"
                        variant="outlined"
                        placeholder="/krakend/v1"
                        value={endpointInput.krakend_endpoint}
                        fullWidth
                        required
                        autoFocus
                        onChange={handleEndpointInputs}
                      />
                      <span
                        style={{
                          fontSize: 12,
                          display: "flex",
                          alignSelf: "flex-start",
                          marginLeft: "4px",
                        }}
                      >
                        HTTP verb
                      </span>
                    </Grid>

                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel id="http_method_label">
                          Http methods
                        </InputLabel>
                        <Select
                          labelId="http_method_label"
                          id="http_method"
                          name="http_method"
                          label="Http methods"
                          value={endpointInput.http_method}
                          onChange={handleEndpointInputs}
                        >
                          <MenuItem value={"GET"}>GET</MenuItem>
                          <MenuItem value={"PUT"}>PUT</MenuItem>
                          <MenuItem value={"POST"}>POST</MenuItem>
                          <MenuItem value={"DELETE"}>DELETE</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        id="parameters"
                        name="parameters"
                        label="Parameters"
                        variant="outlined"
                        placeholder="param_value"
                        value={endpointInput.parameters}
                        onChange={handleEndpointInputs}
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        id="headers_passing_to_backend"
                        name="headers_passing_to_backend"
                        label="Headers passing to backend"
                        placeholder="header_name"
                        value={endpointInput.headers_passing_to_backend}
                        onChange={handleEndpointInputs}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={10}>
                      <TextField
                        id="concurrent_calls"
                        name="concurrent_calls"
                        label="Concurrent Calls"
                        variant="outlined"
                        type="number"
                        value={endpointInput.concurrent_calls}
                        onChange={handleEndpointInputs}
                        fullWidth
                      />
                    </Grid>

                    {/*  rate limit dialog screen */}
                    <Grid item xs={2}>
                      <AlertDialogSlide setDialogData={callbackDialog} />
                    </Grid>

                    <Grid item xs={12}>
                      <hr
                        style={{
                          height: 0.5,
                          backgroundColor: "rgba(0,0,0,0.3)",
                        }}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <Stack direction="row-reverse" spacing={2}>
                        <Button color="secondary">Cancel</Button>
                        <Button variant="contained" onClick={handleSubmit}>
                          Add Backend Query
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>

                  {/* ....second form for backend query.......................  */}

                  <Box sx={{ padding: 10 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <TextField
                          id="backend_endpoint"
                          name="backend_endpoint"
                          label="Backend Endpoint"
                          value={endpointInput.backend_endpoint}
                          onChange={handleEndpointInputs}
                          variant="outlined"
                          fullWidth
                          required
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <FormControl fullWidth>
                          <InputLabel id="http_method_label">
                            Http methods
                          </InputLabel>
                          <Select
                            labelId="http_method_label"
                            id="endpoint_http_method"
                            name="endpoint_http_method"
                            value={endpointInput.endpoint_http_method}
                            onChange={handleEndpointInputs}
                            label="Http methods"
                          >
                            <MenuItem value={"GET"}>GET</MenuItem>
                            <MenuItem value={"PUT"}>PUT</MenuItem>
                            <MenuItem value={"POST"}>POST</MenuItem>
                            <MenuItem value={"DELETE"}>DELETE</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      {/*  rate limit dialog for endpoint screen */}
                      <Grid item xs={2}>
                        <AlertDialogSlideForEndpoint
                          setEndpointDialogData={callbackEndpoint}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
        <div className="endpoint_add_button">
          <Button
            variant="contained"
            endIcon={<AddCircleIcon />}
            onClick={createNewEndpoint}
          >
            Add Endpoint
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Endpoint;
