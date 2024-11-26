import { Image, Text, View } from "react-native";
import Images from "../assets/Images";

export default function ProfileScreen() {
    return (
        <View style={{ flex: 1, alignItems: "center", paddingHorizontal: 20 }}>
            <View style={{ flex: 0.2, flexDirection: "row", borderWidth: 2, width: "100%", height: 30, marginBottom: 20, borderRadius: 15 }}>
                <View style={{ borderWidth: 2, flex: 0.3, justifyContent: "center", alignItems: "center" }}>
                    <Image source={Images.tabProfileIcon} style={{ width: 100, height: 100 }}></Image>
                </View>
                <View style={{ borderWidth: 2, flex: 0.6 }}>
                    <Text>user name</Text>
                </View>

            </View>

            <View style={{ borderWidth: 2, width: "100%", height: 30, marginBottom: 20, borderRadius: 15 }}>
                <Text>settings</Text>

            </View>
            <View style={{ borderWidth: 2, width: "100%", height: 30, marginBottom: 20, borderRadius: 15 }}>
                <Text>About us</Text>

            </View>
            <Text>logout</Text>
        </View>
    )
}