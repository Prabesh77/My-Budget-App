import React, { useState } from "react";
import "./Bootstrap/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  const [data, setData] = useState([]);

  const submitFunc = (a, b) => {
    const newItem = { topic: a, expense: parseInt(b) };
    if (
      !isNaN(b) &&
      (function(b) {
        return (b | 0) === b;
      })(parseFloat(b))
    ) {
      setData([...data, newItem]);
      document.querySelector(".exp-alert").style.display = "none";
    } else if ((a == "") & (b == "")) {
      document.querySelector(".exp-alert").innerHTML =
        "<p>Please fill all fields</p>";
      document.querySelector(".exp-alert").style.display = "block";
    } else {
      document.querySelector(".exp-alert").innerHTML =
        "<p>Expenditure should be number</p>";
      document.querySelector(".exp-alert").style.display = "block";
    }
  };

  const removeItem = index => {
    let allData = [...data];
    console.log("delete");
    allData.splice(index, 1);
    setData(allData);
  };

  const handleExpense = () => {
    let totalExpense = 0;
    data.map(out => (totalExpense += out.expense));
    return totalExpense;
  };

  const handleRemained = sec => {
    let remainedAmt = sec - handleExpense();
    return remainedAmt;
  };

  return (
    <>
      <h1 className="text-white py-4 text-center">My Budget App</h1>
      <div className="container">
        <div className="container1">
          <AddItem
            datas={data}
            submitFunc={submitFunc}
            handleDelete={removeItem}
          />
        </div>
        <div className="container2">
          <Details totalExpense={handleExpense} remainedAmt={handleRemained} />
        </div>
      </div>
    </>
  );
}

const AddItem = ({ datas, submitFunc, handleDelete }) => {
  const [item, setItem] = useState({
    sub: "",
    spent: ""
  });

  const handleChange = e => {
    // console.log(e.target.value);
    setItem({ sub: e.target.value, spent: item.spent });
  };

  const handleSecChange = e => {
    // console.log(e.target.value);
    setItem({ sub: item.sub, spent: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    submitFunc(item.sub, item.spent);
    setItem({ sub: "", spent: "" });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group first">
          <label>TOPIC</label>
          <br />
          <input
            type="text"
            className="topic"
            placeholder="Enter the field of expense..."
            value={item.sub}
            onChange={handleChange}
          />
        </div>
        <div className="form-group second">
          <label>EXPENDITURE</label>
          <br />
          <input
            type="text"
            className="expenditure"
            placeholder="Enter the amount..."
            value={item.spent}
            onChange={handleSecChange}
          />
        </div>
        <button>ADD</button>
      </form>
      {/* ------------------------------ */}
      <p className="alert exp-alert">Expenditure should be integer</p>
      {/* ------------------------------ */}
      <AllLists datas={datas} handleDelete={handleDelete} />
    </div>
  );
};

const AllLists = ({ datas, handleDelete }) => {
  return (
    <>
      <div className="labels list-style">
        <span className="topic-list">TOPIC</span>
        <span className="expenditure-list">EXPENDITURE</span>
      </div>
      {datas.map((data, index) => (
        <Lists
          topic={data.topic}
          expense={data.expense}
          key={index}
          index={index}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
};

const Lists = ({ topic, expense, index, handleDelete }) => {
  return (
    <li className="list-style">
      <span className="topic-list">{topic}</span>
      <span className="expenditure-list">
        <span className="expense-dollar">$ </span>
        {expense}
      </span>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => handleDelete(index)}>
        X
      </button>
    </li>
  );
};

const Details = ({ totalExpense, remainedAmt }) => {
  const [amount, setAmount] = useState("");
  const [second, setSecond] = useState(0);
  const handleChange = e => {
    // let a = e.target.value;
    // if (
    //   !isNaN(a) &&
    //   (function(a) {
    //     return (a | 0) === a;
    //   })(parseFloat(a))
    // ) {
    //   setAmount(a);
    // } else {
    //   console.log("please enter only number");
    // }
    setAmount(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (
      !isNaN(amount) &&
      (function(amount) {
        return (amount | 0) === amount;
      })(parseFloat(amount))
    ) {
      setSecond(amount);
      document.querySelector(".mon-alert").style.display = "none";
    } else {
      document.querySelector(".mon-alert").style.display = "block";
    }
    setAmount("");
  };
  console.log(amount);
  return (
    <div className="details">
      <div className="amt-input">
        <form action="" onSubmit={handleSubmit}>
          <label>Enter the total Amount</label>

          <div className="input-and-btn">
            <input
              type="text"
              placeholder="Enter the total amount"
              onChange={handleChange}
              value={amount}
            />
            <button>Set</button>
          </div>
        </form>
      </div>
      <p className="mon-alert alert">Please enter only numbers</p>
      <h3>DETAILS</h3>
      <div className="total-money-div money-div">
        <span className="label">Total Money:</span>
        <span className="green dollar">$</span>
        <span className="total-money money">{second}</span>
      </div>
      <div className="spent-money-div money-div">
        <span className="label">Spent Money:</span>
        <span className="red dollar">$</span>
        <span className="spent-money money">{totalExpense()}</span>
      </div>
      <div className="remained-money-div money-div">
        <span className="label">Remained Money:</span>
        <span className="yellow dollar">$</span>
        <span className="remained-money money">{remainedAmt(second)}</span>
      </div>
    </div>
  );
};
