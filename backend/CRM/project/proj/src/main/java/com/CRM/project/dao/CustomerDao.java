package com.CRM.project.dao;

import com.CRM.project.entity.Customer;

// import jakarta.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
// @Transactional(readOnly = true)
public class CustomerDao {
    //database
//    @Autowired
    SessionFactory sf;
    @Autowired
    public CustomerDao(SessionFactory sf) {
        super();
        this.sf=sf;
    }
    public String insertCustomer(Customer customer){
        Session session=sf.openSession();
        Transaction tr=session.beginTransaction();
        //insert,update,delete->you need to use transaction
        //save method->session
        session.save(customer);
        tr.commit();
        session.close();
        return "customer inserted succesfully";
    }
    public List<Customer> getCustomersList(){
        Session session=sf.openSession();
         return session.createQuery("from Customer").list();
//        return query;
    }
    public Customer getCustomerById(int id){
        //get-> it will return null if object not found in db
        //load-> it will return objectNotFoundException if object not found in db
        Session session=sf.openSession();
        Customer customer=session.get(Customer.class,id);
        return customer;
    }
    public String updateCustomer(Customer customer){
        Session session=sf.openSession();
        Transaction tr=session.beginTransaction();
        session.update(customer);
        tr.commit();
        session.close();
        return "customer updated succesfully";
    }
    public String deleteCustomerById(int id){
        Session session=sf.openSession();
        Transaction tr=session.beginTransaction();
        Customer customer=session.get(Customer.class,id);
        session.delete(customer);
        tr.commit();
        session.close();
        return "customer deleted successfully";
    }
    public String insertMultipleCustomers(List<Customer> customer){
        Session session=sf.openSession();
        Transaction tr=session.beginTransaction();
        for(Customer c:customer) {
            session.save(c);
        }
        tr.commit();
        session.close();
        return "customers are inserted succesfully";
    }
    public List<Customer> getCustomerByFirstName(String firstName){
        Session session=sf.openSession();
//        customers.setParameter;
        Query<Customer> customers=session.createQuery("from Customer c where c.firstName=:firstName",Customer.class);
        customers.setParameter("firstName",firstName);
        List<Customer> list= customers.list();
        return list;
    }
    public List<Customer> getCustomerByLessThanAge(int age){
        Session session=sf.openSession();
        Query<Customer> customer=session.createQuery("from Customer c where c.age<:age",Customer.class);
        customer.setParameter("age",age);
        List<Customer> list=customer.list();
        return list;
    }
    public List<Customer> getCustomersByAge(int age){
        Session session=sf.openSession();
        Query<Customer>customer=session.createQuery("from Customer c where c.age=:age",Customer.class);
        customer.setParameter("age",age);
        List<Customer> list=customer.list();
        return list;
    }
    public List<Customer> getCustomerByLastName(String lastName){
        Session session=sf.openSession();
        Query<Customer> customer=session.createQuery("from Customer c where c.lastName=:lastName");
        customer.setParameter("lastName",lastName);
        List<Customer> list=customer.list();
        return list;

    }
    public List<Customer> getCustomerByEmail(String email){
        Session session=sf.openSession();
        Query<Customer> customer=session.createQuery("from Customer c where c.email=:email",Customer.class);
        customer.setParameter("email",email);
        List<Customer> list=customer.list();
        return list;
    }
    public List<Customer> getCustomerByMobileNumber(String mobileNumber){
        Session session=sf.openSession();
        Query<Customer> customers=session.createQuery("from Customer c where c.mobileNumber=:mobileNumber",Customer.class);
        customers.setParameter("mobileNumber",mobileNumber);
        List<Customer> list=customers.list();
        return list;
    }
    public String updateFirstName(int id,String firstName){
        Session session=sf.openSession();
        Transaction tr=session.beginTransaction();
        Customer customer=session.get(Customer.class,id);
        customer.setFirstName(firstName);
        tr.commit();
        session.close();
        return "customer updated succesfully";
    }
    public String updateLastName(int id,String lastName){
        Session session=sf.openSession();
        Transaction tr=session.beginTransaction();
        Customer customer=session.get(Customer.class,id);
        customer.setLastName(lastName);
        tr.commit();
        session.close();
        return "customer updated succesfully";
    }
    public String updateEmailId(int id,String emailId){
        Session session=sf.openSession();
        Transaction tr=session.beginTransaction();
        Customer customer=session.get(Customer.class,id);
        customer.setEmail(emailId);
        tr.commit();
        session.close();
        return "email has updated succesfully";
    }
    public String updateMobileNumber(int id,String mobileNumber){
        Session session=sf.openSession();
        Transaction tr=session.beginTransaction();
        Customer customer=session.get(Customer.class,id);
        customer.setMobileNumber(mobileNumber);
        tr.commit();
        session.close();
        return "mobile number has updated successfully";
    }
    public String updateAge(int id,int age){
        Session session=sf.openSession();
        Transaction tr=session.beginTransaction();
        Customer customer=session.get(Customer.class,id);
        customer.setAge(age);
        tr.commit();
        session.close();
        return "age has been updated successfully";
    }
    public List<String> getCustomerFirstNames(){
        Session session=sf.openSession();
        return session.createQuery("select c.firstName from Customer c").list();
    }
}
