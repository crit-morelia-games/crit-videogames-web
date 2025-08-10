import React, { useState } from "react";
import { IconButton } from "@mui/material";
import {
  EditNoteOutlined,
  DeleteOutline,
  KeyboardDoubleArrowRight,
  ManageAccounts,
  History,
} from "@mui/icons-material";
import ModalPatient from "../Modal/ModalPatient";
import ModalDelete from "../Modal/ModalDelete";
import ModalEditTherapist from "../Modal/ModalEditTherapist";
import ModalDeleteTherapist from "../Modal/ModalDeleteTherapist";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import { Filters } from "../../utils/filters";
import ModalUpdateTherapist from "../Modal/ModalUpdateTherapist";

export const CustomActions = ({ row, updated, setUpdated }) => {
  const [open, setOpen] = useState(false);
  const useUser = useAuthUser();
  const role = useUser().role;
  const [openDelete, setOpenDelete] = useState(false);
  const [openTherapist, setOpenTherapist] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {open && (
        <ModalPatient
          open={open}
          setOpen={setOpen}
          row={row}
          updated={updated}
          setUpdated={setUpdated}
        />
      )}
      {openDelete && (
        <ModalDelete
          open={openDelete}
          setOpen={setOpenDelete}
          updated={updated}
          id={row.id}
          name={row.nombre + " " + row.aPaterno + " " + row.aMaterno}
          setUpdated={setUpdated}
        />
      )}
      {openTherapist && (
        <ModalUpdateTherapist
          open={openTherapist}
          setOpen={setOpenTherapist}
          updated={updated}
          setUpdated={setUpdated}
          id={row.id}
        />
      )}
      <IconButton
        sx={{
          color: "blueviolet",
        }}
        onClick={() => setOpen(true)}
        title="Editar Paciente"
      >
        <EditNoteOutlined />
      </IconButton>
      <IconButton
        sx={{
          color: "red",
        }}
        onClick={() => setOpenDelete(true)}
        title="Eliminar Paciente"
      >
        <DeleteOutline />
      </IconButton>
      <IconButton
        sx={{
          color: "orange",
        }}
        onClick={() =>
          navigate(`/dashboard/gameHistory/${row.id}`, {
            state: {
              nombre: row.nombre + " " + row.aPaterno + " " + row.aMaterno,
            },
          })
        }
        title="Ver Historial de Partidas"
      >
        <History />
      </IconButton>
      {role === Filters.ROLE_ORGANIZATION && (
        <IconButton
          sx={{
            color: "green",
          }}
          title="Asignar Terapeuta"
          onClick={() => setOpenTherapist(true)}
        >
          <ManageAccounts />
        </IconButton>
      )}
    </div>
  );
};
export const CustomActionsTherapist = ({ row, updated, setUpdated }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {open && (
        <ModalEditTherapist
          open={open}
          setOpen={setOpen}
          row={row}
          updated={updated}
          setUpdated={setUpdated}
        />
      )}
      {openDelete && (
        <ModalDeleteTherapist
          open={openDelete}
          setOpen={setOpenDelete}
          updated={updated}
          id={row.id}
          name={row.nombre + " " + row.aPaterno + " " + row.aMaterno}
          setUpdated={setUpdated}
        />
      )}
      <IconButton
        sx={{
          color: "blueviolet",
        }}
        onClick={() => setOpen(true)}
        title="Editar Terapeuta"
      >
        <EditNoteOutlined />
      </IconButton>
      <IconButton
        sx={{
          color: "red",
        }}
        onClick={() => setOpenDelete(true)}
        title="Eliminar Terapeuta"
      >
        <DeleteOutline />
      </IconButton>
      <IconButton
        sx={{
          color: "green",
        }}
        title="Ver Pacientes"
        onClick={() =>
          navigate(`/dashboard/allPatients/${row.id}`, {
            state: {
              nombre: row.nombre + " " + row.aPaterno + " " + row.aMaterno,
            },
          })
        }
      >
      </IconButton>
    </div>
  );
};

export const CustomActionsOrganization = ({ row, updated, setUpdated }) => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {open && (
        <ModalPatient
          open={open}
          setOpen={setOpen}
          row={row}
          updated={updated}
          setUpdated={setUpdated}
        />
      )}
      {openDelete && (
        <ModalDelete
          open={openDelete}
          setOpen={setOpenDelete}
          updated={updated}
          id={row.id}
          name={row.nombre + " " + row.aPaterno + " " + row.aMaterno}
          setUpdated={setUpdated}
        />
      )}
      <IconButton
        sx={{
          color: "blueviolet",
        }}
        onClick={() => setOpen(true)}
        title="Editar Paciente"
      >
        <EditNoteOutlined />
      </IconButton>
      <IconButton
        sx={{
          color: "red",
        }}
        onClick={() => setOpenDelete(true)}
        title="Eliminar Paciente"
      >
        <DeleteOutline />
      </IconButton>
      <IconButton
        sx={{
          color: "orange",
        }}
        onClick={() =>
          navigate(`/dashboard/gameHistoryOrg/${row.id}`, {
            state: {
              nombre: row.nombre + " " + row.aPaterno + " " + row.aMaterno,
            },
          })
        }
        title="Ver Historial de Partidas"
      >
        <History />
      </IconButton>
    </div>
  );
};
