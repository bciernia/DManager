import {Box, Card, Typography, Button, Divider} from "@mui/material";
import React, {useEffect, useState} from "react";
import PreviewHandout from "../PreviewHandout/PreviewHandout";

const PreviewLocationRoom = (props) => {
    const room = props.room;
    const handouts = props.handouts;
    const [roomHandouts, setRoomHandouts] = useState([]);

    useEffect(() => {
        setRoomHandouts(handouts.filter(handout => handout.handoutLocation === room.roomId));
    }, [])

    return (
        <Card sx={{backgroundColor: "#f0f0f0", margin: ".5rem 0", padding: ".5rem"}}>
            <Typography variant="h6">{room.roomName}</Typography>
            <Typography variant="body2">{room.roomDescription}</Typography>

            {roomHandouts.length !== 0 && <Divider/>}
            {roomHandouts.length !== 0 && <Typography>Handouts:</Typography>}
            {roomHandouts.length !== 0 &&
                roomHandouts.map(
                    handout => (handout.handoutLocation === room.roomId)
                        ? <PreviewHandout handout={handout}/>
                        : "")}
        </Card>
    )
}

export default PreviewLocationRoom;