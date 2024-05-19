import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Header from '../../components/Header/Header';
import styles from './UserProfile.module.sass';
import CONSTANTS from '../../constants';
import UserInfo from '../../components/UserInfo/UserInfo';
import PayForm from '../../components/PayForm/PayForm';
import { cashOut, clearPaymentStore } from '../../store/slices/paymentSlice';
import { changeProfileViewMode } from '../../store/slices/userProfileSlice';
import Error from '../../components/Error/Error';
import UserProfileSectionButton from '../../components/UserProfileSectionButton/UserProfileSectionButton';
import UserProfilePayFormShower from '../../components/UserProfilePayFormShower/UserProfilePayFormShower';

const UserProfile = ({
  role,
  profileViewMode,
  changeProfileViewMode,
  ...restProps
}) => {
  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        <aside className={styles.aside}>
          <h1 className={styles.headerAside}>Select Option</h1>
          <div className={styles.optionsContainer}>
            <UserProfileSectionButton
              profileViewMode={profileViewMode}
              changeProfileViewMode={changeProfileViewMode}
              text={'User info'}
              mode={CONSTANTS.USER_INFO_MODE}
            />
            {role === CONSTANTS.CREATOR && (
              <UserProfileSectionButton
                profileViewMode={profileViewMode}
                changeProfileViewMode={changeProfileViewMode}
                text={'Cashout'}
                mode={CONSTANTS.CASHOUT_MODE}
              />
            )}
          </div>
        </aside>
        {profileViewMode === CONSTANTS.USER_INFO_MODE ? (
          <UserInfo />
        ) : (
          <UserProfilePayFormShower {...restProps} />
        )}
      </main>
    </>
  );
};

//TODO! приробити slice та переробити це пекло

const mapStateToProps = (state) => {
  const { balance, role } = state.userStore.data;
  const { profileViewMode } = state.userProfile;
  const { error } = state.payment;
  return {
    balance,
    role,
    profileViewMode,
    error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  cashOut: (data) => dispatch(cashOut(data)),
  changeProfileViewMode: (data) => dispatch(changeProfileViewMode(data)),
  clearPaymentStore: () => dispatch(clearPaymentStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
