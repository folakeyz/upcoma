import React from "react";
import MaterialTable from "material-table";
import { displayIcon } from "./Icon";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Table = ({
  data,
  setFormData = undefined,
  setOpen = undefined,
  setEdit = undefined,
  remove = undefined,
  columns,
  selection = false,
  reverse = false,
  url = undefined,
  deleteID = undefined,
  select = undefined,
}) => {
  const navigate = useNavigate();
  return (
    <MaterialTable
      title=""
      columns={columns}
      data={data}
      options={{
        selection: selection,
        exportButton: true,
        actionsCellStyle: {
          backgroundColor: "none",
          color: "#FF00dd",
        },
        actionsColumnIndex: reverse ? 0 : -1,

        headerStyle: {
          backgroundColor: "none",
          color: "black",
          fontSize: "12px",
        },
      }}
      onSelectionChange={(rows) => select(rows)}
      style={{
        boxShadow: "none",
        width: "100%",
        background: "white",
        fontSize: "13px",
      }}
      // icons={{Add: () => 'Add Row'}}
      actions={[
        url && {
          icon: "visibility",
          iconProps: { style: { fontSize: "20px", color: "gold" } },
          tooltip: "View",
          color: "btnGray",
          position: "row",

          onClick: (event, rowData) => {
            navigate(`${url}/${rowData._id}`);
          },
        },
        setFormData && {
          icon: "visibility",
          iconProps: { style: { fontSize: "20px", color: "gold" } },
          tooltip: "Edit",
          color: "btnPurple",
          position: "row",

          onClick: (event, rowData) => {
            setOpen(true);
            setEdit(true);
            setFormData(rowData);
          },
        },
        remove && {
          icon: "delete",
          iconProps: { style: { fontSize: "20px", color: "gold" } },
          tooltip: "Delete",
          color: "btnRed",
          position: "row",

          onClick: (event, rowData) => {
            swal({
              title: "Are you sure?",
              text: "Once deleted, you will not be able to recover this",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then((willDelete) => {
              if (willDelete) {
                deleteID ? remove(rowData[deleteID]) : remove(rowData._id);
              }
            });
          },
        },
      ]}
      components={{
        Action: (props) => (
          <button
            onClick={(event) => props.action.onClick(event, props.data)}
            className={`btnSMtable ${props.action.color}`}
          >
            {displayIcon(props.action.tooltip)}
          </button>
        ),
      }}
    />
  );
};

export default Table;
