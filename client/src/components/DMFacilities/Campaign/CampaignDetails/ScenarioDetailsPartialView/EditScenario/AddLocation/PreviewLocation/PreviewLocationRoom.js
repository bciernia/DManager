import {Box, Card, Typography, Button} from "@mui/material";
import React, {useEffect, useState} from "react";
import PreviewHandout from "../PreviewHandout/PreviewHandout";

const PreviewLocationRoom = (props) => {
    const room = props.room;
    const handouts = props.handouts;

    // const [handoutsFromCurrentRoom, setHandoutsFromCurrentRoom] = useState([]);
    //
    // useEffect(() => {
    //     console.log(handouts);
    //     console.log(room);
    //     setHandoutsFromCurrentRoom(handouts.map(handout =>  (handout.handoutLocation === room.roomId)
    //             ));
    // }, [])

    return (
        <Card sx={{backgroundColor: "#f0f0f0", margin: ".5rem 0", padding: ".5rem"}}>
            <Box sx={{width: "100%", height: "100%"}}>
                <Typography variant="h6">{room.roomName}</Typography>
                <Typography variant="body2">{room.roomDescription}</Typography>
                {handouts.map(
                    handout => (handout.handoutLocation === room.roomId)
                        ? <PreviewHandout handout={handout}/>
                        : "")}

            </Box>
        </Card>
    )
}

export default PreviewLocationRoom;