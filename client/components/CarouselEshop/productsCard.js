import Link from 'next/link';
import styles from '../../styles/carruselShop.module.css'

export default function ProductCard({ info }){
    const {name,image,price}=info;
    return (
        <div className={styles.container}>
            <div className={styles.containerImg}>
        <img className={styles.img} src={image} alt="imagen del producto" />
        <div className={styles.linea}></div>
        <div className={styles.containInfo}>
                <h3 className={styles.name}> {name} </h3>
                    <h1 className={styles.price}>$ {price} </h1>
                </div>
        </div>
        </div>
    );
}

