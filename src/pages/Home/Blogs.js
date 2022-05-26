import React from "react";

const Blogs = () => {
  return (
    <div className="w-10/12 mx-auto">
      <h1 className=" text-2xl">
        What are the different ways to manage a state in a React application?
      </h1>
      <p>
        <b>Ans:</b> There are 4 types of sate in a react application, which are:
        1. Local State. 2. Global State. 3. Server State. 4. URL State
      </p>
      <h1 className=" text-2xl mt-3">
        How does prototypical inheritance work?
      </h1>
      <p>
        <b>Ans:</b> Prototypical inheritence is objects with its methods and
        properties with internal and hidden propertys. it is used to add methods
        and properties in an object. this is a method by which an object can
        inherit the properties and methods of another object
      </p>
      <h1 className=" text-2xl mt-3">
        Why you do not set the state directly in React.
      </h1>
      <p>
        <b>Ans:</b> If you set the set directly and call setState later it will
        replace the update you made and you will lose the state control across
        all components
      </p>
      <h1 className=" text-2xl mt-3">
        You have an array of products. Each product has a name, price,
        description, etc. How will you implement a search to find products by
        name?
      </h1>
      <p>
        <b>Ans:</b> I will use the Filter function to find all the prodcuts with
        matching name
      </p>
      <h1 className=" text-2xl mt-3">
        What is a unit test? Why should write unit tests?
      </h1>
      <p>
        <b>Ans:</b> Unit test is a automated program which is written by
        developers to test the application's design and behaviour. Unit testing
        ensures that the code meets quality standards before its deployed. Unit
        testing also saves time and money, and helps developers write better
        code.
      </p>
    </div>
  );
};

export default Blogs;
