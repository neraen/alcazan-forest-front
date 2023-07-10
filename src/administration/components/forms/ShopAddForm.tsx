import React from 'react';
import { Formik} from 'formik';

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

            <Formik >
                {() => (
                    <form>
                        <label></label>
                    </form>
                )}
            </Formik>
            </div>
        );
    }


}

export default ShopAddForm;



// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.
