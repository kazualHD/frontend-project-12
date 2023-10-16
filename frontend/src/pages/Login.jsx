import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuthorization } from '../contexts/authorizationContext';
import NavBar from '../components/Navbar';
import routes from '../routes';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('loginPage.validation.required'),
  password: Yup.string().required('loginPage.validation.required'),
});

const Login = () => {
  const auth = useAuthorization();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  return (
    <>
    <NavBar/>
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs="12" md="8" xxl="6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={async (values) => {
                  try {
                    await auth.logIn(values);
                    navigate(routes.rootPage());
                  } catch (e) {
                    setError(e.message); 
                  }
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">Войти</h1>
                    <Field
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.username}
                     isinvalid={(touched.username && errors.username) || error}
                     type="text"
                     disabled={isSubmitting}
                     autoComplete="username"
                     placeholder="Ваш ник"
                     className="form-control"
                     name="username"
                   />
                    <ErrorMessage name="username" component="div" className="invalid-feedback" />
                    <Field
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    isinvalid={(touched.password && errors.password) || error}
                    type="password"
                    autoComplete="current-password"
                    placeholder="Пароль"
                    className="form-control mt-3"
                    name="password"
                   />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />

                    <Button
                      className="my-3 w-100"
                      variant="outline-primary"
                      type="submit"
                    >
                      Войти
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта</span>
                <Link to="/register">Зарегистрироваться</Link>
              </div>
              {error && <div className='invalid-feedback'>{error}</div>}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};


export default Login;
