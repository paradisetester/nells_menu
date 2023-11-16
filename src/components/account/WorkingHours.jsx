import React, { useState } from 'react';
import { Table, TableBody, DialogContent, DialogActions, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button, Dialog, DialogTitle } from '@mui/material';
import SnackbarOpen from '../miscellaneous/SnackBar';
import { UserAuth } from '../../context';
import CloseIcon from '@mui/icons-material/Close';
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from '../../firebase';


const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] [APap][mM]$/;

export default function WorkingHoursData({ restaurant }) {

    const [isLoading, setIsLoading] = useState(false)
    const { user } = UserAuth();
    const [open, setOpen] = useState(false)
    const [error, setError] = useState({ status: false, type: "", message: "" });
    const [workingHours, setWorkingHours] = useState([
        { day: 'Sunday', openTime: '', closeTime: '' },
        { day: 'Monday', openTime: '', closeTime: '' },
        { day: 'Tuesday', openTime: '', closeTime: '' },
        { day: 'Wednesday', openTime: '', closeTime: '' },
        { day: 'Thursday', openTime: '', closeTime: '' },
        { day: 'Friday', openTime: '', closeTime: '' },
        { day: 'Saturday', openTime: '', closeTime: '' },
    ]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedWorkingHours = [...workingHours];
        updatedWorkingHours[index][name] = value;
        setWorkingHours(updatedWorkingHours);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = (data) => {
        setOpen(true);
        setWorkingHours([
            { day: 'Sunday', openTime: data[0].openTime || "", closeTime: data[0].closeTime || "" },
            { day: 'Monday', openTime: data[1].openTime, closeTime: data[1].closeTime || "" },
            { day: 'Tuesday', openTime: data[2].openTime, closeTime: data[2].closeTime },
            { day: 'Wednesday', openTime: data[3].openTime, closeTime: data[3].closeTime },
            { day: 'Thursday', openTime: data[4].openTime, closeTime: data[4].closeTime },
            { day: 'Friday', openTime: data[5].openTime, closeTime: data[5].closeTime },
            { day: 'Saturday', openTime: data[6].openTime, closeTime: data[6].closeTime },
        ]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!timeRegex.test(workingHours[0].openTime)) {
                setError({ status: true, type: "error", message: `${workingHours[0].day} Open time is not valid` });
                return;
            }
            if (!timeRegex.test(workingHours[0].closeTime)) {
                setError({ status: true, type: "error", message: `${workingHours[0].day} Close time is not valid` });
                return;
            }
            if (!timeRegex.test(workingHours[1].openTime)) {
                setError({ status: true, type: "error", message: `${workingHours[1].day} Open time is not valid` });
                return;
            }
            if (!timeRegex.test(workingHours[1].closeTime)) {
                setError({ status: true, type: "error", message: `${workingHours[1].day} Close time is not valid` });
                return;
            }
            if (!timeRegex.test(workingHours[2].openTime)) {
                setError({ status: true, type: "error", message: `${workingHours[2].day} Open time is not valid` });
                return;
            }
            if (!timeRegex.test(workingHours[2].closeTime)) {
                setError({ status: true, type: "error", message: `${workingHours[2].day} Close time is not valid` });
                return;
            }
            if (!timeRegex.test(workingHours[3].openTime)) {
                setError({ status: true, type: "error", message: `${workingHours[3].day} Open time is not valid` });
                return;
            }
            if (!timeRegex.test(workingHours[3].closeTime)) {
                setError({ status: true, type: "error", message: `${workingHours[3].day} Close time is not valid` });
                return;
            }
            if (!timeRegex.test(workingHours[4].openTime)) {
                setError({ status: true, type: "error", message: `${workingHours[4].day} Open time is not valid` });
                return;
            }
            if (!timeRegex.test(workingHours[4].closeTime)) {
                setError({ status: true, type: "error", message: `${workingHours[4].day} Close time is not valid` });
                return;
            }
            if (!timeRegex.test(workingHours[5].openTime)) {
                setError({ status: true, type: "error", message: `${workingHours[5].day} Open time is not valid` });
                return;
            }
            if (!timeRegex.test(workingHours[5].closeTime)) {
                setError({ status: true, type: "error", message: `${workingHours[5].day} Close time is not valid` });
                return;
            }
            if (!timeRegex.test(workingHours[6].openTime)) {
                setError({ status: true, type: "error", message: `${workingHours[6].day} Open time is not valid` });
                return;
            }
            if (!timeRegex.test(workingHours[6].closeTime)) {
                setError({ status: true, type: "error", message: `${workingHours[6].day} Close time is not valid` });
                return;
            }
            setIsLoading(true)
            let collectionRef = doc(db, "RestaurantInfo", restaurant.id);
            await updateDoc(collectionRef,
                {
                    workingHours: workingHours,
                    createdBy: user.uid,
                    createdAt: Timestamp.now().toDate(),
                }
            )
            setOpen(false)
            setIsLoading(false);
            setError({ status: true, type: "success", message: "Updated successfully" });
        } catch (error) {
            setError({ status: true, type: "error", message: error.message || "Error in Updated" });
            setIsLoading(false)
        }
    };






    return (
        <div>
            <div className="accountListItems">
                <Typography variant='h6'>Working Hours</Typography>
                {
                    restaurant.workingHours?.length ? (
                        <>
                            <TableContainer component={Paper}>
                                <Button variant='contained' onClick={() => handleEdit(restaurant.workingHours)}>Update Working Hours</Button>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Day</TableCell>
                                            <TableCell>Open Time</TableCell>
                                            <TableCell>Close Time</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {
                                        restaurant.workingHours.map((ele, key) => {
                                            return (
                                                <>
                                                    <TableBody key={key}>
                                                        <TableCell>{ele.day}</TableCell>
                                                        <TableCell>{ele.openTime}</TableCell>
                                                        <TableCell>{ele.closeTime}</TableCell>
                                                    </TableBody>
                                                </>
                                            )
                                        })
                                    }

                                </Table>
                            </TableContainer>
                        </>
                    ) : (
                        <>
                            <Button
                                size='small'
                                sx={{ m: 1, backgroundColor: '#4458BE', borderRadius: 3, p: 1 }}
                                variant="contained"
                                onClick={handleClickOpen}
                            >
                                Add Working hours
                            </Button>
                        </>
                    )
                }
            </div>
            {
                error.status ?
                    <SnackbarOpen
                        message={error.message}
                        useOpen={() => [error, setError]}
                        color={error.type}
                    /> :
                    ""
            }

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {
                        restaurant.workingHours?.length ? "Update Working Hours details to the Menuverse" : "Add Working Hours details to the Menuverse"
                    }
                    <CloseIcon onClick={handleClose} sx={{ fontSize: 30, float: "right", cursor: "pointer" }} color="secondary" />
                </DialogTitle>
                <DialogContent >
                    <form onSubmit={handleSubmit}>
                        {workingHours.map((item, index) => (
                            <div key={item.day}>
                                <TextField
                                    label={`${item.day} - Open Time`}
                                    name="openTime"
                                    value={item.openTime}
                                    onChange={(e) => handleChange(e, index)}
                                    fullWidth
                                    margin="normal"
                                    placeholder='eg:09:30 am'
                                />
                                <TextField
                                    label={`${item.day} - Close Time`}
                                    name="closeTime"
                                    value={item.closeTime}
                                    onChange={(e) => handleChange(e, index)}
                                    fullWidth
                                    margin="normal"
                                    placeholder='eg:10:30 pm'
                                />
                            </div>
                        ))}
                        {
                            isLoading ? (

                                <Button type="submit" variant="contained" color="primary">
                                    loading..
                                </Button>
                            ) : (

                                <Button type="submit" variant="contained" color="primary">
                                    {
                                        restaurant.workingHours?.length ? "Update Working Hours" : "Add Working Hours"
                                    }
                                </Button>
                            )
                        }
                    </form>
                </DialogContent>
                <DialogActions>

                </DialogActions>

            </Dialog>
        </div>
    )
}
