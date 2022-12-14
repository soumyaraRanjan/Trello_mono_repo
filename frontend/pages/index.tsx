import Head from "next/head";
import Image from "next/image";
import Body from "../components/Body";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="bodycontainer">
        <Body />
      </div>
    </>
  );
}
