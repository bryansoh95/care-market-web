import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    FormGroup,
    Input,
    Label
} from 'reactstrap';

const Login = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to Care Market</CardTitle>
                </CardHeader>
                <CardBody>
                    <FormGroup>
                        <Label for='email'>Email</Label>
                        <Input type='email' name='email' id='email' placeholder='Enter Email' required />
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input type='password' name='password' id='password' placeholder='Enter Password' required />
                    </FormGroup>
                    <FormGroup>
                        <Button>Enter</Button>
                    </FormGroup>
                </CardBody>
            </Card>
        </div>
    );
};

export default Login;