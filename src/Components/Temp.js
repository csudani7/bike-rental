import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";

const products = [
  {
    id: 1,
    name: "Organize Basic Set (Walnut)",
    price: "$149",
    rating: 5,
    reviewCount: 38,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 2,
    name: "Organize Pen Holder",
    price: "$15",
    rating: 5,
    reviewCount: 18,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 3,
    name: "Organize Sticky Note Holder",
    price: "$15",
    rating: 5,
    reviewCount: 14,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 4,
    name: "Organize Phone Holder",
    price: "$15",
    rating: 4,
    reviewCount: 21,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg",
    imageAlt: "TODO",
    href: "#",
  }, // More products...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Temp() {
  return (
    <div className="bg-white w-full">
      <div className="max-w-7xl mx-auto overflow-hidden">
        <h2 className="sr-only">Products</h2>

        <div className="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4 gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative border border-gray-200"
            >
              <div className="rounded-lg overflow-hidden aspect-w-1 aspect-h-1 group-hover:opacity-75">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-3/5 h-3/5 object-center object-cover m-auto"
                />
              </div>
              <div className="pt-2 pb-4 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                  <div>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </div>
                </h3>
                <div className="mt-3 flex items-center justify-center">
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating
                            ? "text-yellow-400"
                            : "text-gray-200",
                          "flex-shrink-0 h-5 w-5"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    &nbsp; ({product.reviewCount} reviews)
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-around">
                  <p className="text-base font-medium text-gray-900">Color</p>
                  <p className="text-base font-medium text-gray-900">
                    Location
                  </p>
                </div>
              </div>

              <div className="border-y border-gray-200">
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="w-0 flex-1 flex">
                    <div className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 cursor-pointer">
                      <PencilIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-3">Edit</span>
                    </div>
                  </div>
                  <div className="-ml-px w-0 flex-1 flex">
                    <div className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 cursor-pointer">
                      <TrashIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-3">Delete</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
