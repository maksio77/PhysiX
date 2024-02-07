import { useState, useContext } from "react";
import { TestContext } from "../../components/TestContext";

export default function TestThemes() {
  const { tests, error, loading } = useContext(TestContext);

  console.log(tests)

  return (
    <div>TestThemes</div>
  )
}
