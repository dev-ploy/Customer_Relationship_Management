package com.CRM.project.service;

import com.CRM.project.entity.Customer;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface CustomerService {
    String insertCustomer(Customer customer);
    List<Customer> getCustomersList();
    Customer getCustomerById(int id);
    String updateCustomer(Customer customer);
    String deleteCustomerById(int id);
    String insertMultipleCustomers(List<Customer> customer);
    List<Customer> getCustomerByFirstName(String firstName);
    List<Customer> getCustomerByLessThanAge(int age);
    List<Customer> getCustomerByAge(int age);
    List<Customer> getCustomerByLastName(String lastName);
    List<Customer> getCustomerByEmail(String email);
    List<Customer> getCustomerByMobileNumber(String mobileNumber);
    String updateFirstName(int id,String firstName);
    String updateLastName(int id,String lastName);
    String updateEmailId(int id,String email);
    String updateMobileNumber(int id,String mobileNumber);
    String updateAge(int id,int age);
    List<String> getCustomerFirstName();
}
