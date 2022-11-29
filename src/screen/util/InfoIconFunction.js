
import { doc, setDoc } from 'firebase/firestore';
import { firestoreCon } from '../../firebase/config';

export const LikeButtonInfo = (item, dataPerfil) => {

    console.log(dataPerfil);

    // const docRef = doc(firestoreCon, 'usuario', dataPerfil.id, 'post', item.id, 'like', item.id);
    // try {
    //     // console.log('Creado');
    //     setDoc(docRef, {
    //         like: isLikeTrue,
    //         id: dataPerfil.id
    //     });
    // } catch (error) {
    //     console.log(error)
    // }

}

