
import { doc, setDoc } from 'firebase/firestore';
import { firestoreCon } from '../../firebase/config';

export const LikeButtonInfo = (dataPerfil, item, isLikeTrue) => {

    // console.log(dataPerfil);
    console.log(isLikeTrue);

    const docRef = doc(firestoreCon, 'usuario', dataPerfil.id, 'post', item.id, 'like', item.id);
    try {
        // console.log('Creado');
        setDoc(docRef, {
            like: isLikeTrue,
            id: dataPerfil.id
        });
    } catch (error) {
        console.log(error)
    }

}

