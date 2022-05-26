import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import EquipementApi from "../../../services/EquipementApi";

class ShopAddForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }
    //
    // componentDidMount() {
    //     this.fetchFormElements();
    // }
    //
    // handleChange({ currentTarget }){
    //     const { name, value } = currentTarget;
    //     this.setState({ ...this.state, [name]: value });
    // };
    //
    // handleChangeCaracteristiques({ currentTarget }){
    //     const { name, value } = currentTarget;
    //     const caracteristiques = {...this.state.caracteristiques, [name]: value};
    //     caracteristiques[name] = value;
    //     this.setState({caracteristiques});
    // };
    //
    //
    // async fetchFormElements(){
    //     const formElements = await EquipementApi.fetchFormElements();
    //     this.setState({
    //         listeCaracteristiques: formElements.caracteristiques,
    //         classes: formElements.classes,
    //         rarities: formElements.rarities,
    //         positions: formElements.positions
    //     })
    // }
    //
    //
    // async handleSubmit(event){
    //
    // }

    render() {
        return(
            <div>
                <h1>Shop</h1>
                <Formik
                    initialValues={{ items: this.state.items }}
                    onSubmit={values =>
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                        }, 500)
                    }
                    render={({ values }) => (
                        <Form>
                            <FieldArray
                                name="friends"
                                render={arrayHelpers => (
                                    <div>
                                        {values.items.map((item, index) => (
                                            <div key={index}>
                                                {/** both these conventions do the same */}
                                                <Field name={`items[${index}].name`} />
                                                <Field name={`items.${index}.age`} />

                                                <button type="button" onClick={() => arrayHelpers.remove(index)}>
                                                    -
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => arrayHelpers.push({ name: '', age: '' })}
                                        >
                                            +
                                        </button>
                                    </div>
                                )}
                            />
                        </Form>
                    )}
                />
            </div>
        );
    }


}

export default ShopAddForm;



// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.
