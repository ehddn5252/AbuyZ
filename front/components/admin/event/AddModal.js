import React, { useState } from "react";
import styled from "styled-components";

// mui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid2 from "@mui/material/Unstable_Grid2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddModal(props) {
  console.log(props);
  return (
    <div>
      <Dialog open={props.add} onClose={() => props.setAdd(false)}>
        <DialogTitle>이벤트 등록</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={() => props.setAdd(false)}>등록</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
