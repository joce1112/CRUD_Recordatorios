import { useState, useEffect } from "react";
import { supabase } from "../../config/supabaseClient";
import AppBar from '../../components/AppBar';
import { Button } from "@mui/material";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'react-modal';
import { useTranslation } from "react-i18next";

const customStyles = {
    content: {
      background: 'rgba(0, 0, 0, 0.9)',
      color: '#fff',
     position: 'fixed',
      transition: 'all .5s',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
   
    },
  };
  let subtitle; 
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

export default function Recordatorios({ session }) {
    const { i18n, t } = useTranslation();
    const changeLaguage = (language) => {
      i18n.changeLanguage(language);
    };
    const [loading, setLoading] = useState(true);
    const [id_user_fk, setId_user_fk] = useState(null);
    const [title, setTitle] = useState(null);
    const [created_at, setCreated_at] = useState(null);
    const [contain, setContain] = useState(null);
    const [dateMemories, setDateMemories] = useState(null);
    const [dataTable, setDataTable] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
      }
      
      
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }
      
      function closeModal() {
        setIsOpen(false);
      
      }
    useEffect(() => {
        getMemories();
    }, [session]);

    //Extraemos los recordatorios
    async function getMemories() {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            let { data, error, status } = await supabase
                .from("memorie")
                .select('*')
                .eq("id_user_fk", user.id)
              

            if (error && status !== 406) {
                throw error;
            }
            
            
            if (data) {
              setDataTable(data)
              console.log(dataTable)
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function EditarRecordatorio({title, contain, dateMemories  }) {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            const updates = {

                id: user.id,
                title, 
                contain,
                dateMemories,
                created_at: new Date(),
            };

            let { error } = await supabase.from("memorie").upsert(updates, {
                returning: "minimal", // Don't return the value after inserting
            });
             alert("Recordatorio Actualizado");


            if (error) {
                throw error;
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function addMemorie({title,dateMemories, contain }) {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            const updates = {
                id_user_fk: user.id,
                title, 
                dateMemories, 
                contain,
                created_at: new Date(),
            };
console.log(updates)
            let { error } = await supabase.from("memorie").insert(updates, {
                returning: "minimal", // Don't return the value after inserting
            });

            if (error) {
                throw error;
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            getMemories();
            setLoading(false);
        }
    }
    async function deleteMemorie(id){
        try {
        const { data, error } = await supabase

        .from('memorie')
        .delete()
        .eq('id', id)

        setLoading(true);

        if (error ) {
                throw error;
        }
        console.log(data)
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            setLoading(false);
            getMemories();
        }
    }
    return (  
        <><div className="form-widget">
            <AppBar />

            <div>
                <label htmlFor="email"><p>{t("Email")}</p></label>
                <input
                    id="email"
                    type="text"
                    value={session.user.email}
                    disabled />
            </div>
            <div>
                <label htmlFor="titulo"><p>{t("Title")}</p></label>
                <input
                    id="titulo"
                    type="text"
                    value={session.user.title}
                    onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>
                <label htmlFor="contenido"><p>{t("Countent")}</p></label>
                <input
                    id="contenido"
                    type="text"
                    value={session.user.contain}
                    onChange={(e) => setContain(e.target.value)} />
            </div>
            <div>
                <label htmlFor="fecharecordatorio"><p>{t("Reminder Date")}</p></label>
                <input
                    id="fecharecordatorio"
                    type="Date"
                    value={session.user.dateMemories}
                    onChange={(e) => setDateMemories(e.target.value)} />
            </div>


            <div>
                <Button
                    className="button block primary"
                    onClick={() => 
                        // EditarRecordatorio({ title, dateMemories, contain })
                        addMemorie({
                            title, dateMemories, contain
                        })
                    }
                    disabled={loading}
                >
                    {loading ?<p>{t("Loading ...")}</p>  : <p>{t("UPDATE")}</p>}
                </Button>

            </div>
            <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
        ariaHideApp={false}
    >
        <div>
                <label htmlFor="email"><p>{t("Email")}</p></label>
                <input
                    id="email"
                    type="text"
                    value={session.user.email}
                    disabled />
            </div>
            <div>
                <label htmlFor="titulo">{t("Title")}</label>
                <input
                    id="titulo"
                    type="text"
                    value={title || ""}
                    onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>
                <label htmlFor="contenido">{t("Countent")}</label>
                <input
                    id="contenido"
                    type="text"
                    value={contain || ""}
                    onChange={(e) => setContain(e.target.value)} />
            </div>
            <div>
                <label htmlFor="fecharecordatorio">{t("Reminder Date")}</label>
                <input
                    id="fecharecordatorio"
                    type="Date"
                    value={dateMemories || ""}
                    onChange={(e) => setDateMemories(e.target.value)} />
            </div>


            <div>
                <Button
                    className="button block primary"
                    onClick={() => 
                        // EditarRecordatorio({ title, dateMemories, contain })
                        EditarRecordatorio({
                            title, contain, created_at,dateMemories
                        })
                    }
                    disabled={loading}
                >
                    {loading ? "Loading ..." : "Update"}
                </Button>

            </div>
          <button className="button" onClick={closeModal}>{t("Close")}</button>
      </Modal>
        </div><React.Fragment>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>{t("ID")}</StyledTableCell>
                                <StyledTableCell align="right">{t("Title")}</StyledTableCell>
                                <StyledTableCell align="right">{t("Countent")}&nbsp;</StyledTableCell>
                                <StyledTableCell align="right">{t("Reminder Date")}&nbsp;</StyledTableCell>
                                <StyledTableCell align="right">{t("Creation date")}&nbsp;</StyledTableCell>
                                <StyledTableCell align="right">{t("Operation")}&nbsp;</StyledTableCell>
                                <StyledTableCell align="right">{t("Operation")}&nbsp;</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                       
    
                            {
                            //  {this.state.data.map(d => (<li key={d.id}>{d.name}</li>))} 
                            dataTable.map(memorie => (
                                 <StyledTableRow key={memorie.id} >
                                <StyledTableCell component="th" scope="row">
                                        {memorie.id}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {memorie.title}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{memorie.contain}</StyledTableCell>
                                    <StyledTableCell align="right">{memorie.dateMemories}</StyledTableCell>
                                    <StyledTableCell align="right">{memorie.created_at}</StyledTableCell>
                                    <StyledTableCell >
                  <Button variant="contained"  onClick={() => 
                        // EditarRecordatorio({ title, dateMemories, contain })
                        deleteMemorie(memorie.id)
                    } color="error"> <DeleteIcon /> 
      </Button>
                  
                      </StyledTableCell>
                      <StyledTableCell >
                  <Button variant="contained"  onClick={openModal} color="primary"> <EditIcon /> 
      </Button>
                  
                      </StyledTableCell>
                                    {/* <StyledTableCell align="right">{row.carbs}</StyledTableCell> */}
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </React.Fragment></>
       
        
    );
}