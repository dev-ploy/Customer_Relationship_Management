package com.CRM.project.service.impl;

import com.CRM.project.dao.CustomerDao;
import com.CRM.project.entity.Customer;
import com.CRM.project.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional(readOnly = true)
public class CustomerServiceImpl implements CustomerService {
    public CustomerServiceImpl(CustomerDao customerDao){
        super();
        this.customerDao = customerDao;
    }
    @Autowired
    CustomerDao customerDao;
    @Override
    public String insertCustomer(Customer customer){
        String msg= customerDao.insertCustomer(customer);
        return msg;
    }
    @Override
    public List<Customer> getCustomersList(){
        List<Customer> list= customerDao.getCustomersList();
        return list;
    }
    @Override
    public Customer getCustomerById(int id){
        Customer customer= customerDao.getCustomerById(id);
        return customer;
    }
    @Override
    public String updateCustomer(Customer customer){
        return customerDao.updateCustomer(customer);
    }
    @Override
    public String deleteCustomerById(int id){
        return customerDao.deleteCustomerById(id);
    }
    @Override
    public String insertMultipleCustomers(List<Customer> customer){
        return customerDao.insertMultipleCustomers(customer);
    }
    @Override
    public List<Customer> getCustomerByFirstName(String firstName){
        return customerDao.getCustomerByFirstName(firstName);
    }
    @Override
    public List<Customer> getCustomerByLessThanAge(int age){
        return customerDao.getCustomerByLessThanAge(age);
    }
    @Override
    public List<Customer> getCustomerByAge(int age){
        return customerDao.getCustomersByAge(age);
    }
    @Override
    public List<Customer> getCustomerByLastName(String lastName){
        return customerDao.getCustomerByLastName(lastName);
    }
    @Override
    public List<Customer> getCustomerByEmail(String email){
        return customerDao.getCustomerByEmail(email);
    }
    @Override
    public List<Customer> getCustomerByMobileNumber(String mobileNumber){
        return customerDao.getCustomerByMobileNumber(mobileNumber);
    }
    @Override
    public String updateFirstName(int id,String firstName){
        return customerDao.updateFirstName(id,firstName);
    }
    @Override
    public String updateLastName(int id,String lastName){
        return customerDao.updateLastName(id,lastName);
    }
    @Override
    public String updateEmailId(int id,String email){
        return customerDao.updateEmailId(id,email);
    }
    @Override
    public String updateMobileNumber(int id,String mobileNumber){
        return customerDao.updateMobileNumber(id,mobileNumber);
    }
    @Override
    public String updateAge(int id,int age){
        return customerDao.updateAge(id,age);
    }
    @Override
    public List<String> getCustomerFirstName(){
        return customerDao.getCustomerFirstNames();
    }

}
