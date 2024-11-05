import { useEffect, useState } from "react";
import { Alert, Button, Image, Pressable, Text, View } from "react-native";

import CS571 from "@cs571/mobile-client"

// TODO: Display the bio data from https://cs571api.cs.wisc.edu/rest/f24/ice/mascot
// TODO: Whenever a button is clicked, display the message from https://cs571api.cs.wisc.edu/rest/f24/ice/mascot-messages
export default function Mascot(props) {
    
    const [name, setName] = useState("");
    const [slogan, setSlogan] = useState("");
    const [image, setImage] = useState();

    useEffect(() =>  {
        fetch("https://cs571api.cs.wisc.edu/rest/f24/ice/mascot", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            setName(data.name)
            setSlogan(data.quote)
            setImage(data.imgSrc)
        })
    }, [])

    function speak() {
        // TODO fetch from the API, grab a message, and display it as a popup.
        fetch("https://cs571api.cs.wisc.edu/rest/f24/ice/mascot-messages", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            Alert.alert("Message Recieved!", data.msg);
        })
        
        
    }
    
    return <View>
        {
            name ? <View>
                <Pressable onPress={speak}>
                    <Image style={{height: 100, width: 100}} source={{uri: image}}/>
                    <Text style={{fontSize: 28}}>{name}</Text>
                    <Text style={{fontSize: 16}}>{slogan}</Text>
                </Pressable>
                </View> : <Text>Loading!...</Text>
                
        }
        
    </View>
}