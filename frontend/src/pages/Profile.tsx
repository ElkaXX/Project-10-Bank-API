import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../css/profile.css";
import { editUserProfile, getUserProfile } from "../store/userSlice";

function Profile() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { firstName, lastName } = useSelector((state: RootState) => state.user);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedFirstName, setEditedFirstname] = useState("");
  const [editedLastName, setEditedLastname] = useState("");

  const handleSave = () => {
    dispatch(
      editUserProfile({
        firstName: editedFirstName,
        lastName: editedLastName,
      })
    );
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <Layout>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
          </h1>

          {editMode ? (
            <div className="edit-name">
              <input
                type="text"
                value={editedFirstName}
                onChange={(e) => setEditedFirstname(e.target.value)}
              />
              <input
                type="text"
                value={editedLastName}
                onChange={(e) => setEditedLastname(e.target.value)}
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <>
              <h1> {`${firstName} ${lastName}!`}</h1>
              <button
                className="edit-button"
                onClick={() => {
                  setEditedFirstname(firstName);
                  setEditedLastname(lastName);
                  setEditMode(true);
                }}
              >
                Edit Name
              </button>
            </>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button
              className="transaction-button"
              onClick={() => navigate("/transactions")}
            >
              View transactions
            </button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button
              className="transaction-button"
              onClick={() => navigate("/transactions")}
            >
              View transactions
            </button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button
              className="transaction-button"
              onClick={() => navigate("/transactions")}
            >
              View transactions
            </button>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Profile;
