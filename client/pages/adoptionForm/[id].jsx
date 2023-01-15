import React, { useState, useEffect } from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import styles from "./style.module.css";
import { useDispatch } from "react-redux";
import { getper, getmuni, PostAdop } from "../../stores/actions";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Layout from "../layout";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/footer";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import AdoptionForm1 from "../../components/AdoptionForm/AdoptionForm1";
import AdoptionForm2 from "../../components/AdoptionForm/AdoptionForm2";
import {
  validation,
  handleSelector,
  handleProvincia,
  handleCiudad,
  handleFiles,
  handleSubmit,
  handleDisableInput,
} from "../../controller/validationPostPet";
const ages = [];
for (let i = 0; i <= 40; i++) {
  ages.push(i);
}

export function form(props) {
  const { isLoading, user } = useUser();
  const idUser = user?.sub.split("|")[1];
  const router = useRouter();
  const dispatch = useDispatch();
  const provi = useSelector((state) => state.caracter.provi.provincias);
  const munici = useSelector((state) => state.caracter.municipios.municipios);
  const [errors, setError] = useState({});
  const [post, setPost] = useState({
    userId: idUser,
  });
  const [first, setFirst] = useState(true);

  useEffect(() => {
    if (!props.response.name || props.response.name === " ") {
      Swal.fire({
        title: "Necesitas configurar tu nombre para adoptar",
        icon: "error",
        color: "#437042",
        confirmButtonColor: "#437042",
        confirmButtonAriaLabel: "#437042",
      });
      router.push(`/profile/${idUser}`);
    }
  }, []);

  useEffect(() => {
    dispatch(getper()).then((_) => console.log(provi));
  }, [dispatch]);

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {props.user && (
        <>
          <Layout title="Publicar Mascota" />
          <NavBar />
          <div className={styles.container}>
            <form
              className={styles.form}
              onSubmit={(e) => handleSubmit(e, PostAdop, post, router, errors, Swal)}
            >
              <span className={styles.title}>Datos de la Mascota</span>
              {first ? (
                <AdoptionForm1
                  setError={setError}
                  setPost={setPost}
                  post={post}
                  errors={errors}
                  provi={provi}
                  munici={munici}
                  first={first}
                  setFirst={setFirst}
                  handleProvincia={handleProvincia}
                  handleCiudad={handleCiudad}
                  handleSelector={handleSelector}
                  validation={validation}
                  dispatch={dispatch}
                  getmuni={getmuni}
                ></AdoptionForm1>
              ) : (
                <AdoptionForm2
                  errors={errors}
                  post={post}
                  setFirst={setFirst}
                  validation={validation}
                  handleSelector={handleSelector}
                  handleFiles={handleFiles}
                  setPost={setPost}
                  setError={setError}
                  handleDisableInput={handleDisableInput}
                ></AdoptionForm2>
              )}
            </form>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}

export default withPageAuthRequired(form, {
  onRedirecting: () => <h1>Loading...</h1>,

  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});

export async function getServerSideProps({ params }) {
  try {
    const response = await (
      await fetch("http://localhost:3001/user/" + params.id)
    ).json();
    return {
      props: {
        response,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
