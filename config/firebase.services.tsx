"use client";

import { ReactNode, useMemo } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  FirebaseAppProvider,
  FirestoreProvider,
  AuthProvider,
} from "reactfire";
import { firebaseConfig } from "./firebase";

export default function FirebaseServices({
  children,
}: {
  children: ReactNode;
}) {
  const firebaseApp = useMemo(
    () => (getApps().length ? getApp() : initializeApp(firebaseConfig)),
    [],
  );
  const auth = useMemo(() => getAuth(firebaseApp), [firebaseApp]);
  const firestore = useMemo(() => getFirestore(firebaseApp), [firebaseApp]);

  return (
    <FirebaseAppProvider firebaseApp={firebaseApp}>
      <AuthProvider sdk={auth}>
        <FirestoreProvider sdk={firestore}>{children}</FirestoreProvider>
      </AuthProvider>
    </FirebaseAppProvider>
  );
}
