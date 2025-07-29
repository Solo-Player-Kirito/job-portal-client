import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Building2,
  MapPin,
  Briefcase,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const api = process.env.REACT_APP_API;

const Spinner = () => (
  <div className="flex justify-center items-center h-64">
    <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
  </div>
);

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [applicationStatus, setApplicationStatus] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${api}/api/job?id=${id}`)
      .then((res) => {
        setJob(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load job details. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex =
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{3,6}$/;

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!emailRegex.test(formData.email))
      errors.email = "Invalid email address";
    if (!phoneRegex.test(formData.phone)) errors.phone = "Invalid phone number";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await axios.post(`${api}/api/apply`, {
        jobId: id,

        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

      setApplicationStatus("success");
      setFormData({ name: "", email: "", phone: "" });
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setApplicationStatus("error");
      setError("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setFormData({ name: "", email: "", phone: "" });
    setFormErrors({});
  };

  if (loading && !job) return <Spinner />;

  if (error)
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8 text-red-500">
        {error}
      </div>
    );

  if (!job)
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
        No job found
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md mt-8">
      {applicationStatus === "success" && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
          Your application has been submitted successfully!
        </div>
      )}
      {applicationStatus === "error" && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{job.title}</h2>

        <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
          <div className="flex items-center">
            <Building2 className="w-5 h-5 mr-1 text-blue-500" />
            <span>
              <strong className="text-gray-800">Company:</strong> {job.company}
            </span>
          </div>

          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-1 text-blue-500" />
            <span>
              <strong className="text-gray-800">Location:</strong>{" "}
              {job.location}
            </span>
          </div>

          <div className="flex items-center">
            <Briefcase className="w-5 h-5 mr-1 text-blue-500" />
            <span>
              <strong className="text-gray-800">Type:</strong> {job.type}
            </span>
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Job Description
        </h3>
        <p className="text-gray-700 leading-relaxed">{job.description}</p>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-between w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <span>{showForm ? "Hide Application Form" : "Apply Now"}</span>
          {showForm ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-4 space-y-4 p-4 bg-gray-50 rounded-md"
            noValidate
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`w-full px-3 py-2 border ${
                  formErrors.name ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`w-full px-3 py-2 border ${
                  formErrors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className={`w-full px-3 py-2 border ${
                  formErrors.phone ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {formErrors.phone && (
                <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400 transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default JobDetails;
