import { Alert, ScrollView, StatusBar, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native";
import FileViewer from "react-native-file-viewer";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import CsButton from "../components/CustomeButton";
import { Formik } from "formik";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { billPdf } from "../assets/createBillPdf";

export default function BillForm({ navigation }) {
    const isDarkMode = useColorScheme() === 'dark';
    const d = new Date();
    const todayDate = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`

    const createBill = async (data) => {
        try {
            const htmlString = billPdf(data);
            const today = new Date();
            const trimmedName = data.name?.trim().replace(/\s+/g, " ");
            let PDFOptions = {
                html: `${htmlString}`,
                fileName: `${(trimmedName?.split(' '))[0]}_${(trimmedName?.split(' '))?.[1]?.[0]}_${data.billNo}_${today.getDate()}_${today.getMonth() + 1}_${today.getFullYear()}`,
                directory: Platform.OS === 'android' ? 'Downloadss/Bill' : 'Documents/Bill',
                base64: true,
            };
            let file = await RNHTMLtoPDF.convert(PDFOptions);
            if (!file.filePath) return;
            Alert.alert("stored successfully", "PDF File", [{ 'text': 'Cancel', 'style': 'cancel' }, {
                'text': 'Open', onPress: () => {
                    openFile(file.filePath)
                }
            }])

            const openFile = (path) => {
                FileViewer.open(path, {
                    displayName: "string",
                    showAppsSuggestions: true,
                    showOpenWithDialog: true
                }) // absolute-path-to-my-local-file.
                    .then(() => {
                        // success
                    })
                    .catch((error) => {
                        // error
                        Alert.alert("Error While Opening File:", error.message)
                    });

            }
        }
        catch (error) {
            Alert.alert('Failed to generate pdf:', error.message);
        }
    };

    return (
        <SafeAreaView style={{
            backgroundColor: '#E7E8D1',
        }}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            // backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            // style={backgroundStyle}
            >
                <View
                    style={[
                        {
                            backgroundColor: Colors.white,
                        },
                        styles.container,
                    ]}>
                    <View style={styles.loginFormContainer}>
                        <Formik
                            initialValues={{
                                name: "",
                                address: "",
                                date: todayDate,
                                billNo: "SE-001",
                                phNo: "",
                                gst: "",
                                capacity: "",
                                solarQty: "1",
                                solarRate: "",
                                solarGst: "5",
                                InstallationCharges: "",
                                installationGst: "18",
                                maintainanceCharges: "",
                                maintainanceGst: "18",
                                panelWarranty:"30",
                                inverterWarranty:"7",
                                afterInstallWarranty:"5",
                            }}
                            onSubmit={values => {
                                createBill(values)
                            }}                        >
                            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => {


                                return (
                                    <>
                                        <Text style={styles.label}>Name</Text>
                                        <TextInput
                                            name="name"
                                            placeholder="firstName lastName"
                                            placeholderTextColor={"gray"}
                                            value={values.name}
                                            onChangeText={handleChange("name")}
                                            onBlur={handleBlur("name")}
                                            style={styles.inputText}
                                            keyboardType="text"
                                        />

                                        <Text style={styles.label}>Address</Text>
                                        <TextInput
                                            name="address"
                                            placeholder="address"
                                            placeholderTextColor={"gray"}
                                            value={values.address}
                                            onChangeText={handleChange("address")}
                                            onBlur={handleBlur("address")}
                                            style={styles.inputText}
                                        />
                                        <Text style={styles.label}>GST No.</Text>
                                        <TextInput
                                            name="gst"
                                            placeholder="gst"
                                            placeholderTextColor={"gray"}
                                            value={values.gst}
                                            onChangeText={handleChange("gst")}
                                            onBlur={handleBlur("gst")}
                                            style={styles.inputText}
                                        />

                                        <View style={[styles.horizontalInputcontainer, { marginTop: 20 }]}>
                                            <View style={styles.horizontalInputField}>

                                                <Text style={styles.label}>Date</Text>
                                                <TextInput
                                                    name="date"
                                                    placeholder="dd-mm-yyyy"
                                                    placeholderTextColor={"gray"}
                                                    value={values.date}
                                                    onChangeText={(text) => setFieldValue("date", text)}
                                                    onBlur={handleBlur("date")}
                                                    style={styles.inputText}
                                                />

                                            </View>
                                            <View style={styles.horizontalInputField}>

                                                <Text style={styles.label}>Bill No.</Text>
                                                <TextInput
                                                    name="billNo"
                                                    placeholder="8888888888"
                                                    placeholderTextColor={"gray"}
                                                    value={values.billNo}
                                                    onChangeText={handleChange("billNo")}
                                                    onBlur={handleBlur("billNo")}
                                                    style={styles.inputText}
                                                    keyboardType="text"
                                                />

                                            </View>
                                        </View>

                                        <View style={styles.horizontalInputcontainer}>
                                            <View style={styles.horizontalInputField}>

                                                <Text style={styles.label}>Capacity</Text>
                                                <TextInput
                                                    name="capacity"
                                                    placeholder="000000"
                                                    placeholderTextColor={"gray"}
                                                    value={values.capacity}
                                                    onChangeText={handleChange("capacity")}
                                                    onBlur={handleBlur("capacity")}
                                                    style={styles.inputText}
                                                    keyboardType="numeric"

                                                />

                                            </View>
                                            <View style={styles.horizontalInputField}>

                                                <Text style={styles.label}>Ph No.</Text>
                                                <TextInput
                                                    name="phNo"
                                                    placeholder="8888888888"
                                                    placeholderTextColor={"gray"}
                                                    value={values.phNo}
                                                    onChangeText={handleChange("phNo")}
                                                    onBlur={handleBlur("phNo")}
                                                    style={styles.inputText}
                                                    keyboardType="numeric"
                                                />

                                            </View>
                                        </View>

                                        <View style={styles.horizontalInputcontainer}>
                                            <View style={styles.horizontalInputField}>
                                                <Text style={styles.label}>solarRate</Text>

                                                <TextInput
                                                    name="solarRate"
                                                    placeholder="1"
                                                    placeholderTextColor={"gray"}
                                                    value={values.solarRate}
                                                    onChangeText={handleChange("solarRate")}
                                                    onBlur={handleBlur("solarRate")}
                                                    style={styles.inputText}
                                                    keyboardType="numeric"
                                                />
                                            </View>
                                            <View style={styles.horizontalInputField}>
                                                <Text style={styles.label}>solarGst</Text>

                                                <TextInput
                                                    name="solarGst"
                                                    placeholder="1"
                                                    placeholderTextColor={"gray"}
                                                    value={values.solarGst}
                                                    onChangeText={handleChange("solarGst")}
                                                    onBlur={handleBlur("solarGst")}
                                                    style={styles.inputText}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.horizontalInputcontainer}>
                                            <View style={styles.horizontalInputField}>
                                                <Text style={styles.label}>InstallationCharges</Text>

                                                <TextInput
                                                    name="InstallationCharges"
                                                    placeholder="1"
                                                    placeholderTextColor={"gray"}
                                                    value={values.InstallationCharges}
                                                    onChangeText={handleChange("InstallationCharges")}
                                                    onBlur={handleBlur("InstallationCharges")}
                                                    style={styles.inputText}
                                                    keyboardType="numeric"
                                                />
                                            </View>
                                            <View style={styles.horizontalInputField}>
                                                <Text style={styles.label}>installationGst</Text>

                                                <TextInput
                                                    name="installationGst"
                                                    placeholder="1"
                                                    placeholderTextColor={"gray"}
                                                    value={values.installationGst}
                                                    onChangeText={handleChange("installationGst")}
                                                    onBlur={handleBlur("installationGst")}
                                                    style={styles.inputText}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.horizontalInputcontainer}>
                                            <View style={styles.horizontalInputField}>
                                                <Text style={styles.label}>maintainanceCharges</Text>

                                                <TextInput
                                                    name="maintainanceCharges"
                                                    placeholder="1"
                                                    placeholderTextColor={"gray"}
                                                    value={values.maintainanceCharges}
                                                    onChangeText={handleChange("maintainanceCharges")}
                                                    onBlur={handleBlur("maintainanceCharges")}
                                                    style={styles.inputText}
                                                    keyboardType="numeric"
                                                />
                                            </View>
                                            <View style={styles.horizontalInputField}>
                                                <Text style={styles.label}>maintainanceGst</Text>

                                                <TextInput
                                                    name="maintainanceGst"
                                                    placeholder="1"
                                                    placeholderTextColor={"gray"}
                                                    value={values.maintainanceGst}
                                                    onChangeText={handleChange("maintainanceGst")}
                                                    onBlur={handleBlur("maintainanceGst")}
                                                    style={styles.inputText}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.horizontalInputcontainer}>
                                            <View style={styles.horizontalInputFieldWarranty}>
                                                <Text style={styles.label}>panelWarranty</Text>

                                                <TextInput
                                                    name="panelWarranty"
                                                    placeholder="1"
                                                    placeholderTextColor={"gray"}
                                                    value={values.panelWarranty}
                                                    onChangeText={handleChange("panelWarranty")}
                                                    onBlur={handleBlur("panelWarranty")}
                                                    style={styles.inputText}
                                                    keyboardType="numeric"
                                                />
                                            </View>
                                            <View style={styles.horizontalInputFieldWarranty}>
                                                <Text style={styles.label}>inverterWarranty</Text>

                                                <TextInput
                                                    name="inverterWarranty"
                                                    placeholder="1"
                                                    placeholderTextColor={"gray"}
                                                    value={values.inverterWarranty}
                                                    onChangeText={handleChange("inverterWarranty")}
                                                    onBlur={handleBlur("inverterWarranty")}
                                                    style={styles.inputText}
                                                />
                                            </View>
                                            <View style={styles.horizontalInputFieldWarranty}>
                                                <Text style={styles.label}>InstallWarranty</Text>

                                                <TextInput
                                                    name="afterInstallWarranty"
                                                    placeholder="1"
                                                    placeholderTextColor={"gray"}
                                                    value={values.afterInstallWarranty}
                                                    onChangeText={handleChange("afterInstallWarranty")}
                                                    onBlur={handleBlur("afterInstallWarranty")}
                                                    style={styles.inputText}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ marginBottom: 20 }}><CsButton name={"Create Bill"} color="#d268cc" onClick={handleSubmit} /></View>
                                    </>
                                )
                            }}
                        </Formik>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loginFormContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "#E7E8D1"

    },
    container: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },

    button: {
        padding: 16,
        backgroundColor: '#E9EBED',
        borderColor: '#f4f5f6',
        borderWidth: 1,
    },
    inputLable: {

        color: '#000',
        fontSize: 16
    },
    inputText: {
        height: 40,
        borderWidth: StyleSheet.hairlineWidth,
        width: "80%",
        borderRadius: 5,
        borderColor: "black",
        marginBottom: 10,
        fontSize: 16,
        color: "black"
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'black',
        paddingHorizontal: 4
    },
    selectedTextStyle: {
        color: "black",
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: "black"
    },
    horizontalInputField:
    {
        width: '50%',
        alignItems: 'center'
    },
    horizontalInputFieldWarranty:
    {
        width: '33%',
        alignItems: 'center'
    },
    horizontalInputcontainer:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    label: {
        color: "black",
        fontSize: 16,
        fontWeight: "500",
    }

})