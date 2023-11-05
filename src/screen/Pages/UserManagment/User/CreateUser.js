import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

import axios from "axios";
import Select from 'react-select';
const CreateUser = ({
  Modal,
  Button,
  modalOpen,
  setModalOpen,
  URL,
  toast,
  setAllUsers,
  Oval,
}) => {
  const [loader, setLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  let { handleSubmit, register, reset } = useForm()
  const { confirm } = Modal;
  let [area, setArea] = useState([]);
  let [account, setAccount] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}area/getAll`)
      .then((res) => {
        console.log(res);
        setArea(res.data);
      })
      .then((err) => {
        console.log(err);
      });

    axios
      .get(`${URL}amountType/getAll`)
      .then((res) => {
        console.log(res);
        setAccount(res.data);
      })
      .then((err) => {
        console.log(err);
      });
  }, [])

  
  const submit = async (data, e) => {
    setLoader(true)
    data.city = selectedOption.value
    console.log(data)
    axios.post(`${URL}user/create`, data).then((res) => {
      if (res?.status === 200) {
        toast.success("Customer Created");
        setLoader(false);
        reset()
        setModalOpen(false);
        axios.get(`${URL}user/getAll`).then((res) => {
          console.log(res);
          setAllUsers(res?.data);
        });
      } else {
        return toast.error(res?.data?.message);
      }
    });

  }

  

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(selectedOption);
  };
  const options = [
    { value: 'Islamabad', label: 'Islamabad' },
    { value: 'Karachi', label: 'Karachi' },
    { value: 'Lahore', label: 'Lahore' },
    { value: 'Faisalabad', label: 'Faisalabad' },
    { value: 'Rawalpindi', label: 'Rawalpindi' },
    { value: 'Multan', label: 'Multan' },
    { value: 'Gujranwala', label: 'Gujranwala' },
    { value: 'Peshawar', label: 'Peshawar' },
    { value: 'Quetta', label: 'Quetta' },
    { value: 'Sialkot', label: 'Sialkot' },
    { value: 'Bahawalpur', label: 'Bahawalpur' },
    { value: 'Sargodha', label: 'Sargodha' },
    { value: 'Sukkur', label: 'Sukkur' },
    { value: 'Larkana', label: 'Larkana' },
    { value: 'Gujrat', label: 'Gujrat' },
    { value: 'Jhang', label: 'Jhang' },
    { value: 'Sheikhupura', label: 'Sheikhupura' },
    { value: 'Mardan', label: 'Mardan' },
    { value: 'Kasur', label: 'Kasur' },
    { value: 'Rahim Yar Khan', label: 'Rahim Yar Khan' },
    { value: 'Swabi', label: 'Swabi' },
    { value: 'Muzaffargarh', label: 'Muzaffargarh' },
    { value: 'Dera Ghazi Khan', label: 'Dera Ghazi Khan' },
    { value: 'Burewala', label: 'Burewala' },
    { value: 'Kohat', label: 'Kohat' },
    { value: 'Khanewal', label: 'Khanewal' },
    { value: 'Hafizabad', label: 'Hafizabad' },
    { value: 'Sadiqabad', label: 'Sadiqabad' },
    { value: 'Okara', label: 'Okara' },
    { value: 'Mandi Bahauddin', label: 'Mandi Bahauddin' },
    { value: 'Layyah', label: 'Layyah' },
    { value: 'Kamalia', label: 'Kamalia' },
    { value: 'Kandhkot', label: 'Kandhkot' },
    { value: 'Nankana Sahib', label: 'Nankana Sahib' },
    { value: 'Attock', label: 'Attock' },
    { value: 'Vehari', label: 'Vehari' },
    { value: 'Jhelum', label: 'Jhelum' },
    { value: 'Rahim Yar Khan', label: 'Rahim Yar Khan' },
    { value: 'Kot Addu', label: 'Kot Addu' },
    { value: 'Haripur', label: 'Haripur' },
    { value: 'Malakwal', label: 'Malakwal' },
    { value: 'Swat', label: 'Swat' },
    { value: 'Chakwal', label: 'Chakwal' },
    { value: 'Dera Ismail Khan', label: 'Dera Ismail Khan' },
    { value: 'Chichawatni', label: 'Chichawatni' },
    { value: 'Chishtian', label: 'Chishtian' },
    { value: 'Charsadda', label: 'Charsadda' },
    { value: 'Toba Tek Singh', label: 'Toba Tek Singh' },
    { value: 'Jaranwala', label: 'Jaranwala' },
    { value: 'Ahmedpur East', label: 'Ahmedpur East' },
    { value: 'Kamoke', label: 'Kamoke' },
    { value: 'Sambrial', label: 'Sambrial' },
    { value: 'Jatoi', label: 'Jatoi' },
    { value: 'Haveli Lakha', label: 'Haveli Lakha' },
    { value: 'Kahror Pakka', label: 'Kahror Pakka' },
    { value: 'Kambar', label: 'Kambar' },
    { value: 'Lodhran', label: 'Lodhran' },
    { value: 'Shikarpur', label: 'Shikarpur' },
    { value: 'Mianwali', label: 'Mianwali' },
    { value: 'Nowshera', label: 'Nowshera' },
    { value: 'Kotri', label: 'Kotri' },
    { value: 'Loralai', label: 'Loralai' },
    { value: 'Dera Murad Jamali', label: 'Dera Murad Jamali' },
    { value: 'Bhakkar', label: 'Bhakkar' },
    { value: 'Khanpur', label: 'Khanpur' },
    { value: 'Khuzdar', label: 'Khuzdar' },
    { value: 'Ghotki', label: 'Ghotki' },
    { value: 'Sanghar', label: 'Sanghar' },
    { value: 'Pakpattan', label: 'Pakpattan' },
    { value: 'Hub', label: 'Hub' },
    { value: 'Chakwal', label: 'Chakwal' },
    { value: 'Kharian', label: 'Kharian' },
    { value: 'Hangu', label: 'Hangu' },
    { value: 'Timergara', label: 'Timergara' },
    { value: 'Gwadar', label: 'Gwadar' },
    { value: 'Chaman', label: 'Chaman' },
    { value: 'Kandiaro', label: 'Kandiaro' },
    { value: 'Kotli', label: 'Kotli' },
    { value: 'Tando Adam Khan', label: 'Tando Adam Khan' },
    { value: 'Badin', label: 'Badin' },
    { value: 'Pind Dadan Khan', label: 'Pind Dadan Khan' },
    { value: 'Tank', label: 'Tank' },
    { value: 'Tando Allahyar', label: 'Tando Allahyar' },
    { value: 'Baddomalhi', label: 'Baddomalhi' },
    { value: 'Sakrand', label: 'Sakrand' },
    { value: 'Talagang', label: 'Talagang' },
    { value: 'Choa Saidan Shah', label: 'Choa Saidan Shah' },
    { value: 'Umarkot', label: 'Umarkot' },
    { value: 'Kotli Loharan', label: 'Kotli Loharan' },
    { value: 'Shahdadkot', label: 'Shahdadkot' },
    { value: 'Chak Azam Sahu', label: 'Chak Azam Sahu' },
    { value: 'Jalalpur', label: 'Jalalpur' },
    { value: 'Pindigheb', label: 'Pindigheb' },
    { value: 'Dadhar', label: 'Dadhar' },
    { value: 'Turbat', label: 'Turbat' },
    { value: 'Dijkot', label: 'Dijkot' },
    { value: 'Bhit Shah', label: 'Bhit Shah' },
    { value: 'Khairpur', label: 'Khairpur' },
    { value: 'Ranipur', label: 'Ranipur' },
    { value: 'Mailsi', label: 'Mailsi' },
    { value: 'Mach', label: 'Mach' },
    { value: 'Naushahro Feroze', label: 'Naushahro Feroze' },
    { value: 'Naushehra', label: 'Naushehra' },
    { value: 'Sarai Naurang', label: 'Sarai Naurang' },
    { value: 'Lakki Marwat', label: 'Lakki Marwat' },
    { value: 'Khanqah Sharif', label: 'Khanqah Sharif' },
    { value: 'Khewra', label: 'Khewra' },
    { value: 'Kalabagh', label: 'Kalabagh' },
    { value: 'Kalur Kot', label: 'Kalur Kot' },
    { value: 'Lachi', label: 'Lachi' },
    { value: 'Kot Radha Kishan', label: 'Kot Radha Kishan' },
    { value: 'Khairpur Nathan Shah', label: 'Khairpur Nathan Shah' },
    { value: 'Jand', label: 'Jand' },
    { value: 'Hujra Shah Muqim', label: 'Hujra Shah Muqim' },
    { value: 'Kundian', label: 'Kundian' },
    { value: 'Shujaabad', label: 'Shujaabad' },
    { value: 'Daur', label: 'Daur' },
    { value: 'Gambat', label: 'Gambat' },
    { value: 'Rahwali', label: 'Rahwali' },
    { value: 'Murree', label: 'Murree' },
    { value: 'Ferozwala', label: 'Ferozwala' },
    { value: 'Pindi Bhattian', label: 'Pindi Bhattian' },
    { value: 'Haroonabad', label: 'Haroonabad' },
    { value: 'Narowal', label: 'Narowal' },
    { value: 'Tandlianwala', label: 'Tandlianwala' },
    { value: 'Pir Mahal', label: 'Pir Mahal' },
    { value: 'Toba Tek Singh', label: 'Toba Tek Singh' },
    { value: 'Kot Mumin', label: 'Kot Mumin' },
    { value: 'Rajanpur', label: 'Rajanpur' },
    { value: 'Tando Jam', label: 'Tando Jam' },
    { value: 'Risalpur', label: 'Risalpur' },
    { value: 'Kot Samaba', label: 'Kot Samaba' },
    { value: 'Chunian', label: 'Chunian' },
    { value: 'Fort Abbas', label: 'Fort Abbas' },
    { value: 'Dunga Bunga', label: 'Dunga Bunga' },
    { value: 'Kotli Azad Kashmir', label: 'Kotli Azad Kashmir' },
    { value: 'Chawinda', label: 'Chawinda' },
    { value: 'Qadirpur Ran', label: 'Qadirpur Ran' },
    { value: 'Usta Muhammad', label: 'Usta Muhammad' },
    { value: 'Harnoli', label: 'Harnoli' },
    { value: 'Kabirwala', label: 'Kabirwala' },
    { value: 'Mian Channun', label: 'Mian Channun' },
    { value: 'Khanpur', label: 'Khanpur' },
    { value: 'Kharian', label: 'Kharian' },
    { value: 'Khurrianwala', label: 'Khurrianwala' },
    { value: 'Kohat', label: 'Kohat' },
    { value: 'Kulachi', label: 'Kulachi' },
    { value: 'Lalamusa', label: 'Lalamusa' },
    { value: 'Layyah', label: 'Layyah' },
    { value: 'Liaqatabad', label: 'Liaqatabad' },
    { value: 'Lodhran', label: 'Lodhran' },
    { value: 'Mailsi', label: 'Mailsi' },
    { value: 'Mamoori', label: 'Mamoori' },
    { value: 'Mananwala', label: 'Mananwala' },
    { value: 'Mandi Bahauddin', label: 'Mandi Bahauddin' },
    { value: 'Mianwali Bangla', label: 'Mianwali Bangla' },
    { value: 'Minchinabad', label: 'Minchinabad' },
    { value: 'Mitha Tiwana', label: 'Mitha Tiwana' },
    { value: 'Mithi', label: 'Mithi' },
    { value: 'Morha Tapper', label: 'Morha Tapper' },
    { value: 'Moro', label: 'Moro' },
    { value: 'Nagar Khas', label: 'Nagar Khas' },
    { value: 'Narang', label: 'Narang' },
    { value: 'Narowal', label: 'Narowal' },
    { value: 'Naudero', label: 'Naudero' },
    { value: 'Nawabshah', label: 'Nawabshah' },
    { value: 'Nazimabad', label: 'Nazimabad' },
    { value: 'Nushki', label: 'Nushki' },
    { value: 'Okara', label: 'Okara' },
    { value: 'Pacca Chang', label: 'Pacca Chang' },
    { value: 'Pad Idan', label: 'Pad Idan' },
    { value: 'Pir jo Goth', label: 'Pir jo Goth' },
    { value: 'Qadirpur Ran', label: 'Qadirpur Ran' },
    { value: 'Qasba Gujrat', label: 'Qasba Gujrat' },
    { value: 'Raja Jang', label: 'Raja Jang' },
    { value: 'Rajanpur', label: 'Rajanpur' },
    { value: 'Rajo Khanani', label: 'Rajo Khanani' },
    { value: 'Ratodero', label: 'Ratodero' },
    { value: 'Rohri', label: 'Rohri' },
    { value: 'Rustam', label: 'Rustam' },
    { value: 'Sahiwal', label: 'Sahiwal' },
    { value: 'Sanghar', label: 'Sanghar' },
    { value: 'Sarai Alamgir', label: 'Sarai Alamgir' },
    { value: 'Sarai Naurang', label: 'Sarai Naurang' },
    { value: 'Sargodha', label: 'Sargodha' },
    { value: 'Sehwan Sharif', label: 'Sehwan Sharif' },
    { value: 'Shahdadkot', label: 'Shahdadkot' },
    { value: 'Shahkot', label: 'Shahkot' },
    { value: 'Shikarpur', label: 'Shikarpur' },
    { value: 'Sialkot', label: 'Sialkot' },
    { value: 'Sillanwali', label: 'Sillanwali' },
    { value: 'Sita Road', label: 'Sita Road' },
    { value: 'Sohbatpur', label: 'Sohbatpur' },
    { value: 'Sohawa', label: 'Sohawa' },
    { value: 'Sukkur', label: 'Sukkur' },
    { value: 'Surkhpur', label: 'Surkhpur' },
    { value: 'Tando Adam', label: 'Tando Adam' },
    { value: 'Tando Muhammad Khan', label: 'Tando Muhammad Khan' },
    { value: 'Taranda Muhammad Panah', label: 'Taranda Muhammad Panah' },
    { value: 'Thatta', label: 'Thatta' },
    { value: 'Ubauro', label: 'Ubauro' },
    { value: 'Umarkot', label: 'Umarkot' },
    { value: 'Warah', label: 'Warah' },
    { value: 'Yazman', label: 'Yazman' },
    { value: 'Zafarwal', label: 'Zafarwal' },
    { value: 'Zahir Pir', label: 'Zahir Pir' },
    { value: 'Zhob', label: 'Zhob' },
    { value: 'Ziarat', label: 'Ziarat' },
  ];
  return (

    <Modal
      title="Create Customer"
      style={{ top: 20 }}
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      width={600}
      footer={[
        

      ]}
    >
      <hr />
      <form onSubmit={handleSubmit(submit)}>
        <div className="">


          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Customer Name</label>
            <input
              {...register("customerName")}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Customer Name"
              required

            />

          </div>
          <div className="form-group tw-mt-2">
            <div>City</div>
            <Select

              options={options}
              isSearchable={true}
              isClearable={true}
              maxMenuHeight={200} // Adjust the maximum height as needed
              placeholder="Select The City"
              required
              value={selectedOption}
              onChange={handleSelectChange}
            />
          </div>
          <div className="form-group tw-mt-2">

            <div>Area</div>
            <select
              {...register("area")}
              className="form-select" aria-label="Default select example"
              required>
              <option value="">Select The Area</option>
              {area.map((item)=>{
                return  <option value={item._id}>{item.name}</option>
              })}
            </select>

          </div>

          <div className="form-group tw-mt-2">
            <label htmlFor="exampleInputPassword1">Address</label>
            <input
              {...register("address")}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Address"
              required
            />
          </div>

          <div className="form-group tw-mt-2">
            <label htmlFor="exampleInputPassword1">Phone 1</label>
            <input
              {...register("phone1")}
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Phone 1"
              required
            />
          </div>

          <div className="form-group tw-mt-2">
            <label htmlFor="exampleInputPassword1">Phone 2</label>
            <input
              {...register("phone2")}
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Phone 2"
              required
            />
          </div>

          <div className="form-group tw-mt-2">
            <label htmlFor="exampleInputPassword1">fax</label>
            <input
              {...register("fax")}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="fax"
              required
            />
          </div>







          <div className="form-group tw-mt-2">
            <label htmlFor="exampleInputPassword1">Opening Bal Dr</label>
            <input
              {...register("openingBalDr")}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Opening Bal Dr"
              required
            />
          </div>

          <div className="form-group tw-mt-2">
            <label htmlFor="exampleInputPassword1">Opening Bal Cr</label>
            <input
              {...register("openingBalCr")}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Opening Bal Cr"
              required
            />
          </div>


          <div className="form-group tw-mt-2">

            <div>Account Type</div>
            <select
              {...register("accountType")}
              className="form-select" aria-label="Default select example"
              required>
              <option value="">Select The Account type</option>
              {account.map((item)=>{
                return  <option value={item._id}>{item.type}</option>
              })}
            </select>

          </div>

        </div>
        <div class="form-check tw-mt-2">
          <input  {...register("trailBalance")} class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
          <label class="form-check-label" for="flexCheckChecked">
            Show on Trail Balance
          </label>
        </div>

       

        <div className="tw-mt-4 tw-flex tw-items-center tw-gap-4 tw-justify-end">
        <Button key="cancel" disabled={loader} onClick={() => setModalOpen(false)}>
          Cancel
        </Button>
          <button className=" tw-w-20 tw-h-8 tw-text-cyan-50 tw-rounded-md" id="submit" disabled={loader} style={{"background-color": "#0b9444"}}>
            Create
          </button>

          {loader ? <div class="spinner-border text-primary" role="status">
            {/* <span class="sr-only">Loading...</span> */}
          </div> : null}
        </div>

        

      </form>
    </Modal>
  );
};

export default CreateUser;
