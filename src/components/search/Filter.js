import React, { useState } from 'react';
import axios from 'axios';
import ApiConfig from '../../config/ApiConfig';
import { VscSettings } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";
import { Modal, ModalBody, ModalFooter, Button, Input, Label } from 'reactstrap';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

const Filter = ({ onFiltersApplied }) => {
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    sort: '',
    order: '',
    page: 1,
    limit: '',
    gold_type: '',
    gold_purity: '',
    gem_type: '',
    gem_color: ''
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;

    if (["gold_type", "gold_purity", "gem_type", "gem_color"].includes(name)) {
      setFilters((prevFilters) => {
        const currentValues = prevFilters[name] ? prevFilters[name].split(',') : [];
        const newValues = checked 
          ? [...currentValues, value]
          : currentValues.filter((val) => val !== value);

        return {
          ...prevFilters,
          [name]: newValues.join(',')
        };
      });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const handlePriceRangeChange = (value) => {
    setFilters({
      ...filters,
      priceMin: value[0],
      priceMax: value[1],
    });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleApplyFilters = async () => {
    try {
      let apiUrl = `${ApiConfig.ApiPrefix}/products/filter?`;

      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          apiUrl += `${key}=${filters[key]}&`;
        }
      });

      const response = await axios.get(apiUrl);
      console.log(response.data);
      if (response.data && response.data.products) {
        const filteredProducts = response.data.products.map((product) => ({
          ...product,
          p_images: Array.isArray(product.p_images) ? product.p_images.map(image => `${ApiConfig.cloudprefix}` + image) : []
        }));
        onFiltersApplied(filteredProducts);
        closeModal();
      } else {
        console.error("Response data does not contain products:", response.data);
      }
    } catch (error) {
      console.error('Error fetching filtered results:', error);
    }
  };



  return (
    <div>
      <Button
        onClick={openModal}
        className='filter-btn'
      >
        <VscSettings />
        Filter
      </Button>
      <Modal isOpen={modalIsOpen} toggle={closeModal} size="lg"
        style={{
          width: '315px',
          margin: '0px',
          top: 0,
          bottom: 0,
          right: 0,
          position: 'fixed',
        }}>
        <ModalBody style={{ width: '96%', padding: '5px 10px', paddingBottom: '0px' }}>
          <div style={{ borderBottom: '0.5px solid black', width: '96%', display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <IoMdClose style={{ fontSize: '25px', fontWeight: 'bold' }} onClick={closeModal} />
            <h3 style={{ position: 'relative', left: '30%', marginTop: '10px', fontFamily: 'Nunito Sans sans-serif' }}>Filter</h3>
          </div>
          <div className="filter-container">
            <div className="filter-group">
              <label style={{ fontSize: '15px', marginBottom: '8px' }}>Price (₹): </label>
              <Slider
                range
                min={2500}
                max={5000000}
                value={[filters.priceMin || 2500, filters.priceMax || 5000000]}
                onChange={handlePriceRangeChange}
                className="custom-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px', alignItems: 'center' }}>
                <Input
                  type="number"
                  name="priceMin"
                  value={filters.priceMin || '2500'}
                  onChange={handleInputChange}
                  placeholder="Min"
                />
                <label style={{ fontSize: '20px', margin: '0px 10px', fontFamily: 'sans-serif' }} className='text-muted'>to</label>
                <Input
                  type="number"
                  name="priceMax"
                  value={filters.priceMax || '5000000'}
                  onChange={handleInputChange}
                  placeholder="Max"
                />
              </div>
              <hr></hr>
            </div>
            <div className="filter-group">
              <label style={{ fontSize: '15px', marginBottom: '8px' }}>Gold Type:</label>
              <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Input type="checkbox" name="gold_type" value="Yellow Gold" onChange={handleInputChange} style={{ fontSize: '18px' }} /> <label >Yellow </label> <br></br>
                <Input type="checkbox" name="gold_type" value="Rose Gold" onChange={handleInputChange} style={{ fontSize: '18px' }} /> <label>Rose </label> <br></br>
                <Input type="checkbox" name="gold_type" value="White Gold" onChange={handleInputChange} style={{ fontSize: '18px' }} /> <label>White </label> <br></br>
              </div>
              <hr></hr>
            </div>
            <div className="filter-group">
              <label style={{ fontSize: '15px', marginBottom: '8px' }}>Gold Purity:</label>
              <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Input type="checkbox" name="gold_purity" value="14k" onChange={handleInputChange} />14K
                <Input type="checkbox" name="gold_purity" value="16k" onChange={handleInputChange} />16K
                <Input type="checkbox" name="gold_purity" value="18k" onChange={handleInputChange} />18K
                <Input type="checkbox" name="gold_purity" value="22k" onChange={handleInputChange} />22K
                <Input type="checkbox" name="gold_purity" value="24k" onChange={handleInputChange} />24K
              </div>
              <hr></hr>
            </div>
            <div className="filter-group">
              <label style={{ fontSize: '15px', marginBottom: '8px' }}>Gem Type:</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', marginRight: '10px' }}>
                  <Input type="checkbox" name="gem_type" value="Diamond" onChange={handleInputChange} style={{ fontSize: '17px' }} />
                  <Label style={{ marginLeft: '5px' }}>Diamond</Label>
                </div>
                <div style={{ display: 'flex', marginRight: '10px' }}>
                  <Input type="checkbox" name="gem_type" value="Sapphire" onChange={handleInputChange} style={{ fontSize: '17px' }} />
                  <Label style={{ marginLeft: '5px' }}>Sapphire</Label>
                </div>
                <div style={{ display: 'flex', marginRight: '10px' }}>
                  <Input type="checkbox" name="gem_type" value="Ruby" onChange={handleInputChange} style={{ fontSize: '17px' }} />
                  <Label style={{ marginLeft: '5px' }}>Ruby</Label>
                </div>
                <div style={{ display: 'flex', marginRight: '10px' }}>
                  <Input type="checkbox" name="gem_type" value="Emerald" onChange={handleInputChange} style={{ fontSize: '17px' }} />
                  <Label style={{ marginLeft: '5px' }}>Emerald</Label>
                </div>
                <div style={{ display: 'flex', marginRight: '10px' }}>
                  <Input type="checkbox" name="gem_type" value="Cubic" onChange={handleInputChange} style={{ fontSize: '17px' }} />
                  <Label style={{ marginLeft: '5px' }}>Cubic</Label>
                </div>
                <div style={{ display: 'flex', marginRight: '10px' }}>
                  <Input type="checkbox" name="gem_type" value="Zirconia" onChange={handleInputChange} style={{ fontSize: '17px' }} />
                  <Label style={{ marginLeft: '5px' }}>Zirconia</Label>
                </div>
                <div style={{ display: 'flex' , marginRight: '10px'}}>
                  <Input type="checkbox" name="gem_type" value="Garnet" onChange={handleInputChange} style={{ fontSize: '17px' }} />
                  <Label style={{ marginLeft: '5px' }}>Garnet</Label>
                </div>
                <div style={{ display: 'flex', marginRight: '90px' }}>
                  <Input type="checkbox" name="gem_type" value="Amethyst" onChange={handleInputChange} style={{ fontSize: '17px' }} />
                  <Label style={{ marginLeft: '5px' }}>Amethyst</Label>
                </div>
              </div>
              <hr></hr>
            </div>
            <div className="filter-group">
              <label style={{ fontSize: '15px', marginBottom: '8px' }}>Gem Color:</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', marginRight: '10px' }}>
                  <Input type="checkbox" name="gem_color" value="Transparent" onChange={handleInputChange} />
                  <Label style={{ marginLeft: '5px' }}>Transparent</Label>
                </div>
                <div style={{ display: 'flex', marginRight: '10px' }}>
                  <Input type="checkbox" name="gem_color" value="Crimson red" onChange={handleInputChange} />
                  <Label style={{ marginLeft: '5px' }}>Crimson Red</Label>
                </div>
                <div style={{ display: 'flex', marginRight: '10px' }}>
                  <Input type="checkbox" name="gem_color" value="Emerald green" onChange={handleInputChange} />
                  <Label style={{ marginLeft: '5px' }}>Emerald Green</Label>
                </div>
                <div style={{ display: 'flex', marginRight: '30px' }}>
                  <Input type="checkbox" name="gem_color" value="Rusty red" onChange={handleInputChange} />
                  <Label style={{ marginLeft: '5px' }}>Rusty Red</Label>
                </div>
                <div style={{ display: 'flex', marginRight: '10px' }}>
                  <Input type="checkbox" name="gem_color" value="Velvet Blush" onChange={handleInputChange} />
                  <Label style={{ marginLeft: '5px' }}>Velvet Blush</Label>
                </div>
                <div style={{ display: 'flex', marginRight: '65px' }}>
                  <Input type="checkbox" name="gem_color" value="lilac" onChange={handleInputChange} />
                  <Label style={{ marginLeft: '5px' }}>Lilac</Label>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter style={{ padding: '0px', borderTop: 'none', width: '100%' }}>
          <Button className='apply-filter' onClick={handleApplyFilters}>Apply</Button>
          <Button className='filter-cancel' style={{ flex: 1, height: '100%', marginLeft: '0px', marginTop: '0px' }} onClick={closeModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Filter;