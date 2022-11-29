import { StyleSheet } from "react-native"
import { colores } from "./colores";


export const globalStyle = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    backgroundView: {
        flex: 1,
        backgroundColor: colores.white
    },
    containerGlobal: {
        flex: 1,
        backgroundColor: colores.white,
        marginHorizontal: 10
    },
    btnLogin: {
        width: '100%',
        height: 44,
        backgroundColor: colores.blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    txtBtnLogin: {
        fontSize: 14,
        color: colores.white,
        fontWeight: '900',
    },

    txtNameAvatar: {
        fontSize: 12,
        fontWeight: '900',
        color: colores.black
    },
    icon: {
        width: 30,
        height: 30
    },

    footerAuth: {
        position: 'absolute',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 30,
        borderTopColor: colores.greyLine,
        borderTopWidth: 0.8
    },
    txtFooterAuth: {
        color: colores.grey,
        fontSize: 12,
        fontWeight: '400',
        marginHorizontal: 2,
        paddingTop: 10
    },

    bgBotonToggle: {
        width: 60,
        height: 7,
        borderRadius: 10,
        backgroundColor: colores.white,
        marginVertical: 8,
        alignSelf: 'center'
    },
    avatarImg: {
        width: 95,
        height: 95,
        borderRadius: 100
    },
    btn: {
        width: '100%',
        backgroundColor: colores.blue,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5
    },
    txtBtn: {
        color: colores.white,
        fontWeight: '900',
        padding: 10
    },

    // Estilos de perfil usuario Post
    menuAvatar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 14
    },
    txtName: {
        fontSize: 13,
        fontWeight: '900',
        color: colores.black
    },
    txtAddress: {
        fontSize: 11
    },
    img: {
        width: '100%',
        height: 375
    },
    containerLike: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10
    },
    imgMargin: {
        marginHorizontal: 4
    },
    txtComen: {
        fontSize: 13,
        color: colores.black
    },

    // Estilo de informacion del perfil
    avatarGrey: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: colores.grey,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarWhite: {
        width: 96,
        height: 96,
        backgroundColor: colores.white,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contInfo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtNum: {
        fontSize: 16,
        fontWeight: '900',
        color: colores.black
    },
    txtInfoNum: {
        fontSize: 13,
        fontWeight: '400',
        color: colores.black
    },
    btnEdit: {
        flexDirection: 'row',
        width: '100%',
    },
    btnInfoMessage: {
        marginRight: 10,
        backgroundColor: colores.greyClaro,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center"
    },
    txtBtnInfoMessage: {
        paddingVertical: 10,
        fontWeight: '500'
    },
    txtBtn: {
        fontSize: 13,
        fontWeight: '900',
        lineHeight: 18,
    }
});