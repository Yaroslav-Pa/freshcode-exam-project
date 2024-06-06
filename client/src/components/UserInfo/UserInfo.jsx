import React from 'react';
import { connect } from 'react-redux';
import UpdateUserInfoForm from '../UpdateUserInfoForm/UpdateUserInfoForm';
import { updateUser } from '../../store/slices/userSlice';
import { changeEditModeOnUserProfile } from '../../store/slices/userProfileSlice';
import CONSTANTS from '../../constants';
import styles from './UserInfo.module.sass';
import UserInfoBlock from '../UserInfoBlock/UserInfoBlock';

function UserInfo({
  isEdit,
  changeEditMode,
  data: { avatar, firstName, lastName, displayName, email, role, balance },
  updateUser,
}) {
  const updateUserData = (values) => {
    const formData = new FormData();
    formData.append('file', values.file);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('displayName', values.displayName);
    updateUser(formData);
  };
  //TODO! relockate to constants?
  const userInfoArr = [
    { label: 'First Name', info: firstName },
    { label: 'Last Name', info: lastName },
    { label: 'Display Name', info: displayName },
    { label: 'Email', info: email },
    { label: 'Role', info: role },
  ];

  const userInfoList = userInfoArr.map((item) => (
    <UserInfoBlock {...item} key={item.label} />
  ));

  return (
    <div className={styles.mainContainer}>
      {isEdit ? (
        <UpdateUserInfoForm onSubmit={updateUserData} />
      ) : (
        <section className={styles.infoContainer}>
          <img
            src={
              avatar === 'anon.png'
                ? CONSTANTS.ANONYM_IMAGE_PATH
                : `${CONSTANTS.publicImagesURL}${avatar}`
            }
            className={styles.avatar}
            alt="user"
          />
          <div className={styles.infoContainer}>
            {userInfoList}
            {role === CONSTANTS.CREATOR && (
              <UserInfoBlock label={'Balance'} info={`${balance}$`} />
            )}
          </div>
        </section>
      )}
      <button
        onClick={() => changeEditMode(!isEdit)}
        className={styles.buttonEdit}
      >
        {isEdit ? 'Cancel' : 'Edit'}
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { data } = state.userStore;
  const { isEdit } = state.userProfile;
  return { data, isEdit };
};

const mapDispatchToProps = (dispatch) => ({
  updateUser: (data) => dispatch(updateUser(data)),
  changeEditMode: (data) => dispatch(changeEditModeOnUserProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
